import React from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen'

export default function Instructions () {
    const handle = useFullScreenHandle();

    return (
        <div>
            <h2>Exam Name Goes Here</h2>
            <section>
                <h1>Instructions</h1>
                <ul>
                    <li>
                        <p>Instruction 1 goes here</p>
                    </li>
                    <li>
                        <p>Instruction 2 goes here</p>
                    </li>
                    <li>
                        <p>Instruction 3 goes here</p>
                    </li>
                    <li>
                        <p>Instruction 4 goes here</p>
                    </li>
                </ul>
            </section>
            <section>
                <label htmlFor="confirm"><input type="checkbox" name="" id="confirm" />I have read and understood the instructions</label>
                <button onClick={handle.enter}>Continue</button>
            </section>
        </div>
    )
}