import React, {useState, useEffect} from 'react';
import styles from './body.module.css';
import axios from 'axios';

export default function Body (props) {

    // const [answerValue, setAnswerValue] = useState('');
    const [showQuestions, setShowQuestions] = useState(false);

    console.log(props.index)

    let data = {
        exam_session: 'SUMMER-2021',
        user_id: localStorage.getItem('user_id'),
        user_ses_id: localStorage.getItem('session_id'),
        exam_code: props.exam_code,
        subject_code: props.subject_code,
        exam_id: props.exam_id,
        scheduler_id: props.scheduler_id,
        roll_number: props.roll_number,
        question_id: 'Q00' + (props.index+1),
        ip: '0.0.0.0'
    }

    useEffect(() => {
        setShowQuestions(false)
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
            console.log(questionAttemptData[0])
            if(questionAttemptData[0] === '~') {
                props.updateAnswerValue('');
            } else {
                props.updateAnswerValue(questionAttemptData[0]);
            }
            setShowQuestions(true);

        } catch(e) {
            console.log(e.response);
        }

    }

    function radioHandler(event) {
        props.updateAnswerValue(event.target.id)
    }
    
    return (
        <div className={styles.body}>
            {showQuestions && <section className={styles.question}>
                <h3>Question number {props.index+1}</h3>
                <p>{props.languageChosen === 'lang-1'? props.questionList[props.index][14] : props.questionList[props.index][19]}</p>
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id doloribus illum inventore, rerum illo et ipsum debitis dolore optio ratione omnis architecto praesentium hic, explicabo, error ipsam magni labore. Modi.
                Neque architecto impedit incidunt recusandae consequuntur expedita, mollitia, voluptas itaque ea rem sint nesciunt quis. Eligendi aliquid nemo deserunt nobis quam odit id quae officia possimus adipisci, error consectetur perferendis.
                Quis possimus saepe veniam dolor voluptatem! Deserunt hic quas aliquam fugiat ipsam alias quam assumenda porro obcaecati explicabo, sed voluptates tempore ea nulla perspiciatis iste similique corporis consequatur cumque? Similique.
                Eius assumenda quidem fugit odit consectetur. Assumenda, tenetur! Eaque ex reprehenderit saepe itaque alias laboriosam iure laborum voluptas odit quam veritatis qui, blanditiis corrupti quo assumenda doloribus aliquam labore et.
                Laborum saepe tempore est incidunt dolorum eaque dolorem assumenda necessitatibus rerum ratione reprehenderit in at beatae impedit magni, veritatis ducimus temporibus non sint! Neque, aspernatur iusto inventore facere deserunt rem?</p> */}
            </section>}
            {showQuestions && <section className={styles.options}>
                <ul onChange={radioHandler}>
                    <li>
                        <label htmlFor="opt1"><input type="radio" name="ans" id="a" checked={props.answerValue === 'a'} />{props.languageChosen === 'lang-1'? props.questionList[props.index][15] : props.questionList[props.index][20]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt2"><input type="radio" name="ans" id="b" checked={props.answerValue === 'b'} />{props.languageChosen === 'lang-1'? props.questionList[props.index][16] : props.questionList[props.index][21]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt3"><input type="radio" name="ans" id="c" checked={props.answerValue === 'c'} />{props.languageChosen === 'lang-1'? props.questionList[props.index][17] : props.questionList[props.index][22]}</label>
                    </li>
                    <li>
                        <label htmlFor="opt4"><input type="radio" name="ans" id="d" checked={props.answerValue === 'd'} />{props.languageChosen === 'lang-1'? props.questionList[props.index][18] : props.questionList[props.index][23]}</label>
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