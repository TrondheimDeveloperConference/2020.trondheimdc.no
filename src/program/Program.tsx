import React from 'react';
import {getFavorites, getFilters, getSessions, LoadingState, Session, toggleFavourite} from "./data";
import program_jumbotron from '../media/img/jumbotron/programme_jumbotron.png';
import {Link} from "react-router-dom";
import {CheckCircle, Circle} from 'react-feather';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStopwatch} from "@fortawesome/free-solid-svg-icons/faStopwatch";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons/faLocationArrow";
import {faGlobeEurope} from "@fortawesome/free-solid-svg-icons/faGlobeEurope";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

interface ProgramProps {
}

interface ProgramState {
    filter: Filter
    loadingState: LoadingState,
    sessions: Session[],
    favorites: string[]
}

type lang = 'en' | 'no' | 'both';
type format = 'all' | 'presentation' | 'workshop' | 'fav';
class Filter {
    constructor(
        readonly language: lang = 'both',
        readonly format: format = 'all'
    ) { }

    withLanguage(language: lang): Filter {
        return new Filter(language, this.format);
    }

    withFormat(f: format): Filter {
        return new Filter(this.language, f);
    }
}

const MondayPrefix = '2020-10-26';
const TuesdayPrefix = '2020-10-27';

export default class Program extends React.PureComponent<ProgramProps, ProgramState> {
    constructor(props: ProgramProps) {
        super(props);
        this.state = {
            filter: new Filter(),
            loadingState: LoadingState.LOADING,
            sessions: [],
            favorites: []
        }
    }

    componentDidMount() {
        Promise.all([getSessions(), getFavorites(), getFilters()])
            .then(([sessions, favorites, filters]) => {
                this.setState({
                    sessions,
                    favorites,
                    filter: filters ? filters : new Filter(),
                    loadingState: LoadingState.LOADED
                })
            }).catch(rejected => {
            this.setState({
                loadingState: LoadingState.ERROR
            })
        })
    }

    render() {
        return <>
            <section className="jumbotron text-left bg-warning">
                <div className="container text-left d-md-flex flex-md-equal">
                    <div className="overflow-hidden">
                        <img src={program_jumbotron} className="img-fluid"  alt=''/>
                    </div>
                </div>
            </section>
            <div className="container text-white p-0">
                <FilterContainer filter={this.state.filter}
                                 updateFilter={(filter: Filter) => this.setState({filter})}/>
            </div>
            <div className="container text-white  py-5">
                {this.getContent(this.state)}
            </div>
        </>
    }

    private getContent(state: ProgramState) {
        const loadingState = state.loadingState;
        switch (loadingState) {
            case LoadingState.LOADING:
                return <Loading/>;
            case LoadingState.ERROR:
                return <Failure/>;
            case LoadingState.LOADED:
                return <SessionList favorites={state.favorites}
                                    sessions={this.filterSessions(state.sessions, state.filter, state.favorites)}
                                    addToFav={(sessionId: string) => this.toggleFavorite(sessionId)}/>;
            default:
                makeSwitchExaustive(loadingState);
        }
    }

    private filterSessions(sessions: Session[], filter: Filter, fav: string[]) {
        const {language, format} = filter;

        return sessions
            .filter(s => language === 'both' || s.language === language)
            .filter(s => format === 'all' || s.format === format || (format === 'fav' && fav.includes(s.sessionId)));
    }

    private toggleFavorite(sessionId: string) {
        toggleFavourite(sessionId)
            .then(favs => {
                this.setState({favorites: favs});
            });
    }
}


export const Failure: React.FC = () => {
    return (
        <div className='program__loading'>
            <h2 className='program__loading-header'>Woooops!</h2>
            It seems something is seriously wrong here. We are most likely informed and working on it, so just try again
            in a while.
        </div>
    )
};

export const Loading: React.FC = () => {
    return (
        <div className='program__loading'>
            <h2 className='program__loading-header'>Loading program...</h2>
            Hold on one second, fetching program!
        </div>
    )
};

interface SessionListProps {
    sessions: Session[];
    favorites: string[];
    addToFav: (sessionId: string) => void;
}

function SessionList(props: SessionListProps) {
    return (
        <>
            <Day favorites={props.favorites} addToFav={props.addToFav}
                 title='Conference 26. October' key='conference'
                 sessions={props.sessions} dayFilter={MondayPrefix}/>
            <Day favorites={props.favorites} addToFav={props.addToFav}
                 title='Workshops 27. & 28. October' key='workshope'
                 sessions={props.sessions} dayFilter={TuesdayPrefix}/>
        </>
    );
}

interface DayProps {
    sessions: Session[];
    favorites: string[];
    addToFav: (sessionId: string) => void;
    title: string;
    dayFilter: string;
}

function Day(props: DayProps) {
    const filteredList = props.sessions.filter(session => session.startTime.startsWith(props.dayFilter));
    const timeSlots = groupByTimeSlot(filteredList);
    return (
        filteredList.length > 0 ?
            <div className="container m-0 p-0">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="m-0 p-0">{props.title}</h2>
                    </div>
                </div>
                        {Object
                            .keys(timeSlots)
                            .map((timeSlot, idx) => {
                                return <div className="row calendar-row" key={timeSlot + idx}>
                                    <div className={`col-md-12`}>
                                        <h3>{timeSlot.substr(-5)}</h3>
                                    </div>
                                    {timeSlots[timeSlot]
                                        .map((session, idx) => {
                                            const isFavorite = props.favorites.indexOf(session.sessionId) !== -1;
                                            const fav = isFavorite ? 'favourite' : '';
                                            return (


                                                <div key={session.sessionId}
                                                     className={`row calendar-event mt-2 mb-5 py-3  ${fav}`}>
                                                    <div className='col-md-11 col-sm-10'>
                                                        <h4 className='text-uppercase'>
                                                            <Link to={`/program/${session.sessionId}`}>
                                                                <strong>{session.title}</strong>
                                                            </Link>
                                                        </h4>
                                                        <ul className='list-inline'>
                                                            <li className='list-inline-item'>
                                                                <FontAwesomeIcon icon={faStopwatch} aria-hidden='true'/>
                                                                &nbsp;{session.length} minutes
                                                            </li>
                                                            <li className='list-inline-item'>
                                                                <FontAwesomeIcon icon={faLocationArrow} aria-hidden='true'/>
                                                                &nbsp;{session.room}
                                                            </li>
                                                            <li className='list-inline-item'>
                                                                <FontAwesomeIcon icon={faGlobeEurope} aria-hidden='true'/>
                                                                &nbsp;{session.language === "en" ? "English" : "Norwegian"}
                                                            </li>
                                                            {session.speakers.map(speaker => (
                                                                <li key={speaker.name} className='list-inline-item'>
                                                                    <FontAwesomeIcon icon={faUser} aria-hidden='true'/>
                                                                    &nbsp;{speaker.name}
                                                                </li>))}
                                                        </ul>
                                                    </div>
                                                    <div className='col-md-1 col-sm-2 program-favorite-button'>
                                                        <button onClick={() => {props.addToFav(session.sessionId)}}>
                                                            {isFavorite ? <CheckCircle size={32} /> : <Circle size={32} />}
                                                        </button>
                                                    </div>
                                                </div>)
                                        })}
                                </div>
                            })}


            </div> : null
    );
}

function groupByTimeSlot(sessions: Session[]): {[a: string]: Session[]} {
    const sorted = sessions.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    return sorted.reduce(
        (rv: { [a: string]: Session[] }, x: Session) => {
            (rv[x['startTime']] = rv[x['startTime']] || []).push(x);
            return rv;
        }, {});
}

interface FilterProps {
    filter: Filter,
    updateFilter: (filter: Filter) => void
}
function FilterContainer (props: FilterProps) {
    const {language, format} = props.filter;
    return (
        <div className="program-filter container">
            <div className="row">
                <div className="col-md-6">
                    <div className="program-filter-header">Language</div>
                    <div className="program-filter-button-group">
                        <button className={`program-filter-button btn btn-primary ${language === 'both' ? 'selected' : ''}`}
                                onClick={(e) => {
                            const {filter} = props;
                            props.updateFilter(filter.withLanguage('both'))
                        }}>
                            Both
                        </button>
                        <button className={`program-filter-button btn btn-primary ${language === 'no' ? 'selected' : ''}`}
                                onClick={(e) => {
                            const {filter} = props;
                            props.updateFilter(filter.withLanguage('no'))
                        }}>
                            Norwegian
                        </button>
                        <button className={`program-filter-button btn btn-primary ${language === 'en' ? 'selected' : ''}`}
                                onClick={(e) => {
                                    const {filter} = props;
                                    props.updateFilter(filter.withLanguage('en'))
                                }}>
                            English
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <div className="program-filter-header">Format</div>
                <div className="program-filter-button-group">
                    <button className={`program-filter-button btn btn-primary ${format === 'all' ? 'selected' : ''}`}
                            onClick={(e) => {
                                const {filter} = props;
                                props.updateFilter(filter.withFormat('all'))
                            }}>
                        All
                    </button>
                    <button className={`program-filter-button btn btn-primary ${format === 'presentation' ? 'selected' : ''}`}
                            onClick={(e) => {
                                const {filter} = props;
                                props.updateFilter(filter.withFormat('presentation'))
                            }}>
                        Presentations
                    </button>
                    <button className={`program-filter-button btn btn-primary ${format === 'workshop' ? 'selected' : ''}`}
                            onClick={(e) => {
                                const {filter} = props;
                                props.updateFilter(filter.withFormat('workshop'))
                            }}>
                        Workshops
                    </button>
                    <button className={`program-filter-button btn btn-primary ${format === 'fav' ? 'selected' : ''}`}
                            onClick={(e) => {
                                const {filter} = props;
                                props.updateFilter(filter.withFormat('fav'))
                            }}>
                        My Favorites
                    </button>
                </div>
                </div>
            </div>
        </div>
    )
}

export function makeSwitchExaustive(_unused: never): never {
    throw new Error('This should never happen because compiler will find this bug!');
}
