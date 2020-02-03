import React from 'react';

import partner_background from './media/img/coc_background.png';

const Speakers = () => {
    return <>
        <section className="jumbotron text-left bg-warning">

            <div className="container text-left d-md-flex flex-md-equal">
                <div className="overflow-hidden">
                    <h1>Call for Speakers</h1>
                    <h2>Speak at Trondheim Developer Conference 2020</h2>
                </div>
            </div>
        </section>


        <div id="index">
            <div className="container first mb-5">
                <div className="d-md-flex flex-md-equal">
                    <div className="col-md-6">
                        <h2 className="text-lg-right text-md-right text-sm-left pr-5 pt-4 text-white">About TDC</h2>
                    </div>
                    <div className="col-md-6 text-left text-white mt-4">
                        <p>TDC 2020 will be the eight time Trondheim Developer Conference is arranged, and we want you
                         on the stage on the 26th October!</p>
                         <p>
                            Trondheim Developer Conference hosts both international and Norwegian speakers. We'd love to have you join us in 2020!
                         </p>

                         <p>
                            Our Call for speakers is open, it closes in the middle of may.
                         </p>
                         <p>
                         <a href='https://submit.trondheimdc.no'>Submit your talk!</a>
                         </p>
                    </div>
                </div>
                <div className="d-md-flex flex-md-equal">
                    <div className="col-md-6">
                        <h2 className="text-lg-right text-md-right text-sm-left pr-5 pt-4 text-white">Audience and topics?</h2>
                    </div>
                    <div className="col-md-6 text-left text-white mt-4">
                        <p>The agenda consists of multiple tracks for front-end, back-end, agile developers, and digital design.
                        The conference strives to reach a balance between local, national and international speakers,
                        and a relatively large share of call-for-presentation submissions.</p>
                        <p>
                        TDC aims to cover all aspects of IT, so all topics are interessting!
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-fluid p-0 pb-2 m-0">
                <div className="d-md-flex flex-md-equal">
                    <img src={partner_background} className="img-fluid" alt=''/>
                </div>
            </div>

            <div className="container first mb-5 py-5">
                <div className="d-md-flex flex-md-equal">
                    <div className="col-md-6">
                        <h2 className="text-lg-right text-md-right text-sm-left pr-5 pt-4 text-white">Tips and tricks for speakers</h2>
                    </div>
                    <div className="col-md-6 text-left text-white mt-4">
                        <p>Javazone have a good page with <a href='https://2020.javazone.no/speakers/tips'>tips and tricks for speakers</a></p>
                    </div>
                </div>
                <div className="d-md-flex flex-md-equal">
                    <div className="col-md-6">
                        <h2 className="text-lg-right text-md-right text-sm-left pr-5 pt-4 text-white">What's in it for me?</h2>
                    </div>
                    <div className="col-md-6 text-left text-white mt-4">
                        <p>Accepted presentations and workshops</p>
                        <p>
                        As a TDC speaker, you get free admission to the conference.
                        Additionally, you are also invited to the speakers' dinner, held on October 25th.
                        And there are lots of fame and glory!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default Speakers;
