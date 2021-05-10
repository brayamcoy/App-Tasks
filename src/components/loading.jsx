import React from "react";
import {ClockLoader} from "react-spinners";

export default function Loading(){
        return (
            <div className="loading">
                <ClockLoader color="#d14242"/>
            </div>
        );
}
