import React from 'react';

import partner_background from './media/img/coc_background.png';
import dataforeningen from './media/img/index/dataforeningen.svg';
import ixda from './media/img/index/ixda.svg';
import javabin from './media/img/index/javabin.svg';
import nnug from './media/img/index/nnug.svg';
import spillmakerlauget from './media/img/index/spillmakerlauget.svg';

const About = () => {
    return <>
        <section className="jumbotron text-left bg-warning">

            <div className="container text-left d-md-flex flex-md-equal">
                <div className="overflow-hidden">
                    <h1>About Trondheim Developer Conference</h1>
                </div>
            </div>
        </section>



        <div id="index">
            <div className="container-fluid second p-5 my-2">
                <div className="d-md-flex flex-md-equal">
                    <div className="col-md-6 p-0 m-0">
                       <h2 className="text-lg-right text-md-right text-sm-left pr-5 pt-4 text-white">Eight years!</h2>
                    </div>
                    <div className="col-md-4 text-left text-white mt-0">
                        <p>TDC is a noncommercial event where all profit goes towards the next year’s conference and other
                            community events throughout the year in Trondheim</p>

                        <a href="https://www.dataforeningen.no/arrangementer/?fwp_hele_landet=trondheim">
                            <img src={dataforeningen} className="img-fluid" width="15%" alt='Dataforeningen'/>
                        </a>
                        <a href="https://www.meetup.com/IXDATrondheim/">
                            <img src={ixda} className="img-fluid" width="18%" alt='IxDA'/>
                        </a>
                        <a href="https://www.meetup.com/javaBin-Trondheim/">
                            <img src={javabin} className="img-fluid" width="22%" alt='javaBin'/>
                        </a>
                        <a href="https://www.meetup.com/nnug-trondheim/">
                            <img src={nnug} className="img-fluid" width="20%" alt='NNUG'/>
                        </a>
                        <a href="https://spillmakerlauget.no/">
                            <img src={spillmakerlauget} className="img-fluid" width="20%" alt='Spillmakerlauget' />
                        </a>

                        <p className="mt-4">
                            The above communities have joined forces and are giving developers and designers in
                            the greater Trondheim region and Norway an arena for learning, networking and communication across all development disciplines.
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
                        <h2 className="text-lg-right text-md-right text-sm-left pr-5 pt-4 text-white">We support the IT community in Trondheim!</h2>
                    </div>
                    <div className="col-md-6 text-left text-white mt-4">
                        <p>Are you having a meetup and want support? We can help you with a place to host, and maybe some food and refreshments!</p>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default About;
