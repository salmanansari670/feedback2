const scriptURL =
"https://script.google.com/macros/s/AKfycbx6qhR7VtGi5YOcBVPMAsIRG1_AYhPCX2_Q_Ew6d_f7NoW2qzAUynQ5Vqji2Nm1Hub-hA/exec";


const questions = [

    "Audibility, Confidence and Gestures of Teacher",
    "Ability to control session and maintain discipline",
    "Timely completion of Lecture",
    "Timely checking Assignment",
    "Teaching topics with clarity",
    "Teaching/practical plan shared and followed",
    "Encourages questions and discussion",
    "Help for exam-oriented discussion",
    "Use of innovative methods/tools",
    "Invest maximum time for useful content"

];


/* =========================================
   TE SUBJECTS - CHANGE THESE LATER
========================================= */

const subjects = {

    sub1: {
        name: "ADC",
        teacher: "Dr. Geeta Desai"
    },

    sub2: {
        name: "ERTOS",
        teacher: "Prof. Shahin Athavani"
    },

    sub3: {
        name: "SE",
        teacher: "Dr. Riyaz Pathan"
    },

    sub4: {
        name: "PE(OS)",
        teacher: "Prof. Shagufta Baseer"
    },

    sub5: {
        name: "PE(DWM)",
        teacher: "Prof. Gnanasekaran"
    },

    sub6: {
        name: "MDM3(CO)",
        teacher: "Prof. Raheen Shaikh"
    },

    sub7: {
        name: "MDM3(AIML)",
        teacher: "Prof. Jyoti Baviskar"
    },

    sub8: {
        name: "MDM3(DS)",
        teacher: "Prof. Sangeeta Gopal"
    },

    sub9: {
        name: "MDM3(ME)",
        teacher: "Prof. Zia Momin"
    },

    sub10: {
        name: "MDM3(EE)",
        teacher: "Prof. Shradha Kumawat"
    },

    sub11: {
        name: "OE-II(BDM)",
        teacher: "Prof. Sheeba Naaz"
    },

    sub12: {
        name: "OE-II(Psyco)",
        teacher: "Dr. Prabha Joshi"
    },

    sub13: {
        name: "OE-II(Law)",
        teacher: "Prof. Junaid Maste"
    },

    sub14: {
        name: "OE-II(Economy)",
        teacher: "DR. Girish Mahajan"
    }

};


/* =========================================
   COMMON FUNCTIONS
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createSubjectSelection();

        document
            .getElementById("form")
            .addEventListener(
                "submit",
                submitFeedback
            );

    }
);


function createSubjectSelection() {

    const container =
        document.getElementById(
            "subjectSelection"
        );


    Object.keys(subjects).forEach(
        function (code) {

            const label =
                document.createElement(
                    "label"
                );


            label.className =
                "subject-check";


            label.innerHTML = `

                <input
                    type="checkbox"
                    class="subject-checkbox"
                    value="${code}">

                ${subjects[code].name}
                - ${subjects[code].teacher}

            `;


            container.appendChild(
                label
            );

        }
    );


    document
        .querySelectorAll(
            ".subject-checkbox"
        )
        .forEach(function (checkbox) {

            checkbox.addEventListener(
                "change",
                updateSubjects
            );

        });

}


function getSelectedSubjects() {

    const checked =
        document.querySelectorAll(
            ".subject-checkbox:checked"
        );


    const selected = [];


    checked.forEach(
        function (checkbox) {

            selected.push(
                checkbox.value
            );

        }
    );


    return selected;

}


function updateSubjects() {

    const selected =
        getSelectedSubjects();


    const tabs =
        document.getElementById(
            "subjectTabs"
        );


    const container =
        document.getElementById(
            "subjectContainer"
        );


    tabs.innerHTML = "";

    container.innerHTML = "";


    if (selected.length === 0) {

        tabs.innerHTML = `
            <p class="select-message">
                Please select at least one subject.
            </p>
        `;

        return;

    }


    selected.forEach(
        function (code, index) {


            const tab =
                document.createElement(
                    "button"
                );


            tab.type = "button";

            tab.className =
                "tab-button";


            if (index === 0) {

                tab.classList.add(
                    "active"
                );

            }


            tab.innerText =
                subjects[code].name;


            tab.addEventListener(
                "click",
                function () {

                    openSubject(code);

                }
            );


            tabs.appendChild(tab);


            const section =
                document.createElement(
                    "div"
                );


            section.id = code;

            section.className =
                "subject-section";


            if (index === 0) {

                section.classList.add(
                    "active"
                );

            }


            section.innerHTML =
                createSubjectForm(code);


            container.appendChild(
                section
            );

        }
    );

}


function createSubjectForm(code) {

    let html = `

        <div class="subject-header">

            <h3>
                ${subjects[code].name}
            </h3>

            <p class="teacher">
                ${subjects[code].teacher}
            </p>

        </div>

    `;


    questions.forEach(
        function (question, index) {

            const q = index + 1;


            html += `

                <div class="question-box">

                    <p class="question">
                        ${q}. ${question}
                    </p>

                    <div class="options">

                        <label>
                            <input
                                type="radio"
                                name="${code}_q${q}"
                                value="1">
                            Improvement Expected
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="${code}_q${q}"
                                value="2">
                            Average
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="${code}_q${q}"
                                value="3">
                            Good
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="${code}_q${q}"
                                value="4">
                            Very Good
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="${code}_q${q}"
                                value="5">
                            Excellent
                        </label>

                    </div>

                </div>

            `;

        }
    );


    html += `

        <div class="suggestion-box">

            <label class="suggestion-label">
                <b>Suggestions for Improvement:</b>
            </label>

            <textarea
                id="${code}_q11"
                rows="4"
                placeholder="Enter your suggestion (optional)">
            </textarea>

        </div>

    `;


    return html;

}


function openSubject(code) {

    document
        .querySelectorAll(
            ".subject-section"
        )
        .forEach(function (section) {

            section.classList.remove(
                "active"
            );

        });


    document
        .querySelectorAll(
            ".tab-button"
        )
        .forEach(function (button) {

            button.classList.remove(
                "active"
            );

        });


    document
        .getElementById(code)
        .classList.add("active");


    document
        .querySelectorAll(
            ".tab-button"
        )
        .forEach(function (button) {

            if (
                button.innerText ===
                subjects[code].name
            ) {

                button.classList.add(
                    "active"
                );

            }

        });

}


function isSubjectComplete(code) {

    for (
        let q = 1;
        q <= 10;
        q++
    ) {

        if (
            !document.querySelector(
                `input[name="${code}_q${q}"]:checked`
            )
        ) {

            return false;

        }

    }


    return true;

}


function submitFeedback(e) {

    e.preventDefault();


    const name =
        document
            .getElementById("name")
            .value
            .trim();


    const roll =
        document
            .getElementById("roll")
            .value
            .trim();


    const year =
        document
            .getElementById("year")
            .value;


    if (!name) {

        alert(
            "Please enter Student Name."
        );

        return;

    }


    if (!roll) {

        alert(
            "Please enter Roll Number."
        );

        return;

    }


    const selectedSubjects =
        getSelectedSubjects();


    if (selectedSubjects.length === 0) {

        alert(
            "Please select at least one subject."
        );

        return;

    }


    const feedback = [];


    for (
        let i = 0;
        i < selectedSubjects.length;
        i++
    ) {


        const code =
            selectedSubjects[i];


        if (!isSubjectComplete(code)) {

            alert(
                "Please complete all 10 questions for " +
                subjects[code].name
            );


            openSubject(code);

            return;

        }


        const subjectData = {

            subject:
                subjects[code].name

        };


        for (
            let q = 1;
            q <= 10;
            q++
        ) {

            const selected =
                document.querySelector(
                    `input[name="${code}_q${q}"]:checked`
                );


            subjectData["q" + q] =
                selected.value;

        }


        subjectData.q11 =
            document
                .getElementById(
                    `${code}_q11`
                )
                .value
                .trim();


        feedback.push(
            subjectData
        );

    }


    const data = {

        name: name,

        roll: roll,

        year: year,

        subjects: feedback

    };


    const button =
        document.getElementById(
            "submitButton"
        );


    button.disabled = true;

    button.innerText =
        "Submitting...";


    const iframe =
        document.createElement(
            "iframe"
        );


    iframe.name =
        "hiddenFrame";

    iframe.style.display =
        "none";


    document.body.appendChild(
        iframe
    );


    const form =
        document.createElement(
            "form"
        );


    form.method = "POST";

    form.action =
        scriptURL;

    form.target =
        "hiddenFrame";


    const input =
        document.createElement(
            "input"
        );


    input.type = "hidden";

    input.name = "data";

    input.value =
        JSON.stringify(data);


    form.appendChild(input);

    document.body.appendChild(form);

    form.submit();


    setTimeout(
        function () {

            window.location.href =
                "success.html";

        },
        2000
    );

}
