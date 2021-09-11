import React, {useState, useEffect} from 'react';
import styles from './body.module.css';
import axios from 'axios';
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Body (props) {

    const [optionA, setOptionA] = useState('');
    const [optionB, setOptionB] = useState('');
    const [optionC, setOptionC] = useState('');
    const [optionD, setOptionD] = useState('');

    const [isActive, setIsActive] = useState(false);

    // const [answerValue, setAnswerValue] = useState('');
    const [showQuestions, setShowQuestions] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    // console.log(props.index)

    let data = {
        exam_session: 'SUMMER-2021',
        user_id: localStorage.getItem('user_id'),
        user_ses_id: localStorage.getItem('session_id'),
        exam_code: props.exam_code,
        subject_code: props.subject_code,
        exam_id: props.exam_id,
        scheduler_id: props.scheduler_id,
        roll_number: props.roll_number,
        question_id: props.questionList[props.index] && props.questionList[props.index][0],
        ip: localStorage.getItem('ipv4'),
    }

    useEffect(() => {
        let interval = null;
        if (isActive) {
          interval = setInterval(() => {
            props.setQuestionTimer(seconds => seconds + 1);
          }, 1000);
        } else if (!isActive && props.questionTimer !== 0) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isActive, props.questionTimer]);

    useEffect(() => {
        // props.elapsedTime = 0;
        // console.log(props.elapsedTime);
        // console.log("before true");
        // elapsedTimer(true);
        console.log(props.questionTimer);
        props.setQuestionTimer(0);
        setIsActive(false);

        setIsActive(true);

        props.setFooterFun(false);
        setShowQuestions(false);
        setShowOptions(false);
        SendPostRequest();
    }, [props.index]); // eslint-disable-line react-hooks/exhaustive-deps

    async function SendPostRequest() {
        const url = 'http://103.12.1.55:81/OnlineUNIV_EXAM_LOGSrv1.asmx/';
        

        data = Object.keys(data).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        try {
            const res = await axios({
                method: 'post',
                url: url + 'student_exam_question_answer_read',                           
                crossDomain: true,
                data: data,
                headers
            });
            const parser = new DOMParser();
            const xml = parser.parseFromString(res.data, 'text/xml');
            const questionAttemptData = xml.documentElement.firstChild.data
            console.log(questionAttemptData)
            if(questionAttemptData[0] === '~') {
                if(questionAttemptData[1] === 'y') {
                    props.setReviewStatusFun(true);
                }
                else {
                    props.setReviewStatusFun(false);
                }
                props.updateAnswerValue('');
            } else {
                if(questionAttemptData[2] === 'y') {
                    props.setReviewStatusFun(true);
                }
                else {
                    props.setReviewStatusFun(false);
                }
                props.updateAnswerValue(questionAttemptData[0]);
            }
            getOption();
            setShowOptions(true);
            setShowQuestions(true);
            props.setFooterFun(true);

        } catch(e) {
            console.log(e.response);
        }

    }

    function radioHandler(event) {
        props.updateAnswerValue(event.target.id)
    }

    // function btnHandler() {
    //     if (window.screen.width <= 768) {
    //         if (props.sidebarVisibility.display === '' || props.sidebarVisibility.display === 'none') props.setsidebarVisibility({ display: 'block' })
    //         else props.setsidebarVisibility({ display: 'none' })
    //     }
    // }

    let img1 = Buffer.from(props.questionList[props.index][24], "base64").toString();
    // let img2 = Buffer.from(props.questionList[props.index][25], "base64").toString();

    const imageClick = () => {
        props.setShowImage(true);
    } 

    function getOption() {
        if(props.questionList[props.index][27][0] === 'A') {
            if(props.languageChosen === props.primaryLang) {
                setOptionA(props.questionList[props.index][15]);
            }
            else {
                setOptionA(props.questionList[props.index][20]);
            }
        }
        if(props.questionList[props.index][27][2] === 'A') {
            if(props.languageChosen === props.primaryLang) {
                setOptionB(props.questionList[props.index][15]);
            }
            else {
                setOptionB(props.questionList[props.index][20]);
            }
        }
        if(props.questionList[props.index][27][4] === 'A') {
            if(props.languageChosen === props.primaryLang) {
                setOptionC(props.questionList[props.index][15]);
            }
            else {
                setOptionC(props.questionList[props.index][20]);
            }
        }
        if(props.questionList[props.index][27][6] === 'A') {
            if(props.languageChosen === props.primaryLang) {
                setOptionD(props.questionList[props.index][15]);
            }
            else {
                setOptionD(props.questionList[props.index][20]);
            }
        }
        if(props.questionList[props.index][27][0] === 'B') {
            if(props.languageChosen === props.primaryLang) {
                setOptionA(props.questionList[props.index][16]);
            }
            else {
                setOptionA(props.questionList[props.index][21]);
            }
        }
        if(props.questionList[props.index][27][2] === 'B') {
            if(props.languageChosen === props.primaryLang) {
                setOptionB(props.questionList[props.index][16]);
            }
            else {
                setOptionB(props.questionList[props.index][21]);
            }
        }
        else if(props.questionList[props.index][27][4] === 'B') {
            if(props.languageChosen === props.primaryLang) {
                setOptionC(props.questionList[props.index][16]);
            }
            else {
                setOptionC(props.questionList[props.index][21]);
            }
        }
        if(props.questionList[props.index][27][6] === 'B') {
            if(props.languageChosen === props.primaryLang) {
                setOptionD(props.questionList[props.index][16]);
            }
            else {
                setOptionD(props.questionList[props.index][21]);
            }
        }
        if(props.questionList[props.index][27][0] === 'C') {
            if(props.languageChosen === props.primaryLang) {
                setOptionA(props.questionList[props.index][17]);
            }
            else {
                setOptionA(props.questionList[props.index][22]);
            }
        }
        if(props.questionList[props.index][27][2] === 'C') {
            if(props.languageChosen === props.primaryLang) {
                setOptionB(props.questionList[props.index][17]);
            }
            else {
                setOptionB(props.questionList[props.index][22]);
            }
        }
        if(props.questionList[props.index][27][4] === 'C') {
            if(props.languageChosen === props.primaryLang) {
                setOptionC(props.questionList[props.index][17]);
            }
            else {
                setOptionC(props.questionList[props.index][22]);
            }
        }
        if(props.questionList[props.index][27][6] === 'C') {
            if(props.languageChosen === props.primaryLang) {
                setOptionD(props.questionList[props.index][17]);
            }
            else {
                setOptionD(props.questionList[props.index][22]);
            }
        }
        if(props.questionList[props.index][27][0] === 'D') {
            if(props.languageChosen === props.primaryLang) {
                setOptionA(props.questionList[props.index][18]);
            }
            else {
                setOptionA(props.questionList[props.index][23]);
            }
        }
        if(props.questionList[props.index][27][2] === 'D') {
            if(props.languageChosen === props.primaryLang) {
                setOptionB(props.questionList[props.index][18]);
            }
            else {
                setOptionB(props.questionList[props.index][23]);
            }
        }
        if(props.questionList[props.index][27][4] === 'D') {
            if(props.languageChosen === props.primaryLang) {
                setOptionC(props.questionList[props.index][18]);
            }
            else {
                setOptionC(props.questionList[props.index][23]);
            }
        }
        if(props.questionList[props.index][27][6] === 'D') {
            if(props.languageChosen === props.primaryLang) {
                setOptionD(props.questionList[props.index][18]);
            }
            else {
                setOptionD(props.questionList[props.index][23]);
            }
        }
    }
    
    
    return (
        <div className={styles.body}>
            
            {/* <button style={{float: 'left'}} onClick={btnHandler}>Click me!</button> */}
            {showQuestions && <section className={styles.question}>
                <h3>Question number {props.index+1}</h3>
                <div dangerouslySetInnerHTML={{__html: props.languageChosen === props.primaryLang ? props.questionList[props.index][14] : props.questionList[props.index][19]}}></div>
                <img src={"data:image/jpeg;base64," + img1 } style={{display: 'block'}} alt="" onClick={() => imageClick()}/>
            </section>}
            {showOptions && <section className={styles.options}>
                
                <ul onChange={radioHandler}>
                    <li>
                        <label htmlFor="opt1"><input type="radio" name="ans" id="a" checked={props.answerValue === 'a'} />{optionA}</label>
                    </li>
                    <li>
                        <label htmlFor="opt2"><input type="radio" name="ans" id="b" checked={props.answerValue === 'b'} />{optionB}</label>
                    </li>
                    <li>
                        <label htmlFor="opt3"><input type="radio" name="ans" id="c" checked={props.answerValue === 'c'} />{optionC}</label>
                    </li>
                    <li>
                        <label htmlFor="opt4"><input type="radio" name="ans" id="d" checked={props.answerValue === 'd'} />{optionD}</label>
                    </li>
                </ul>
                {/* <ul onChange={radioHandler}>
                    <li>
                        <label htmlFor="opt1"><input type="radio" name="ans" id="opt1" />Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi provident dolor voluptas hic reiciendis ipsa nam a? Magni reprehenderit, sapiente corrupti nulla repudiandae quaerat distinctio numquam quis facilis nobis maiores!
                        Perspiciatis alias, unde adipisci sunt enim repellendus eaque quae. Quaerat, dolorem laborum aperiam nihil expedita explicabo esse, facere, fugit eaque deleniti nemo corrupti possimus voluptatem quam omnis ducimus perspiciatis illum!
                        Est velit fugiat eligendi, ab et minus illum dolorem inventore eveniet officiis, quos dignissimos labore? Vero architecto error veritatis itaque enim. At cum molestiae recusandae quos assumenda laborum, similique suscipit!</label>
                    </li>
                    <li>
                        <label htmlFor="opt2"><input type="radio" name="ans" id="opt2" />Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit earum, nihil tempore iure neque non quia voluptate ullam inventore quae deserunt nobis eaque, libero unde vero illum aut labore repudiandae.
                        Officiis cum, tempore quaerat fuga non recusandae reprehenderit eaque laudantium facilis iure laboriosam. Nemo fuga aspernatur ex tempore, tenetur tempora consequuntur! Minima eius ratione aliquid ex repudiandae earum, ea officia.
                        Voluptatum illum odio hic asperiores sunt quidem excepturi sit porro non placeat? Distinctio dolor asperiores nobis hic iure reiciendis perspiciatis deserunt corrupti commodi! Inventore tenetur maxime quisquam veritatis sit suscipit.</label>
                    </li>
                    <li>
                        <label htmlFor="opt3"><input type="radio" name="ans" id="opt3" />Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, ea. Saepe, voluptatum esse, vel similique eius dolorum sequi sapiente quasi explicabo quibusdam molestiae assumenda libero ipsam. Eos nisi perferendis ut.
                        Molestiae, enim voluptatem tempore unde, sunt nam omnis maxime nihil nisi voluptate expedita impedit earum hic velit quos iusto harum? Eligendi, provident. Minima cumque est culpa? Illo quis similique sed.
                        Pariatur fugit eos, nam amet distinctio magnam maiores, necessitatibus rerum assumenda non animi. Ut repellendus, id accusantium hic sint consectetur harum, vero, perferendis quae laborum distinctio! Laudantium dolorem consequuntur possimus.</label>
                    </li>
                    <li>
                        <label htmlFor="opt4"><input type="radio" name="ans" id="opt4" />Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptates a ex asperiores necessitatibus nobis quo, consequatur nulla omnis esse numquam deleniti repellendus excepturi quisquam eligendi iste inventore quaerat. Est?
                        Tempora sit, nam quasi praesentium similique facere eveniet, veniam ullam voluptatem et id nihil voluptate! Ratione soluta dolor exercitationem quasi placeat ut, vel illum molestiae numquam fuga officiis iste error?
                        Voluptas quae error eaque, quibusdam aliquid quisquam? Sapiente, fugiat officiis culpa vitae odit qui sunt iusto repudiandae porro, corrupti a, tempore similique voluptatem illum! Nostrum libero inventore sequi cum dolorum?</label>
                    </li>
                </ul> */}
            </section>}
        </div>
    )
}