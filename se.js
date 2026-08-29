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
   SE SUBJECTS
========================================= */

const subjects = {

    mdm1aiml: {
        name: "mdm1aiml",
        teacher: "Prof. Saima Sayyed"
    },

    mdm1co: {
        name: "mdm1co",
        teacher: "Prof. Zuhaib Sayyed"
    },

    mdm1ds: {
        name: "mdm1ds",
        teacher: "Prof. Zuhaib Sayyed"
    },

    mdm1ee: {
        name: "mdm1ee",
        teacher: "Prof. Sheeba Naaz"
    },
     SM: {
        name: "edc",
        teacher: "Prof. Ataul Mustafa"
    },

    dlca: {
        name: "dlca",
        teacher: "Prof. Bandanawaz Kotiyal"
    },
      dsa: {
        name: "dsa",
        teacher: "Prof. Umar Masumdar"
    },
      edc: {
        name: "edc",
        teacher: "Prof. Muslim Rangwala"
    }
     
      
};

/* =========================================
   PAGE LOAD
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


/* =========================================
   CREATE CHECKBOXES
========================================= */

function createSubjectSelection() {

    const container =
        document.getElementById(
            "subjectSelection"
        );


    Object.keys(subjects).forEach(
        function (code) {

            const label =
                document.createElement("label");


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


            container.appendChild(label);

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


/* =========================================
   GET SELECTED SUBJECTS
========================================= */

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


/* =========================================
   UPDATE SUBJECT TABS
========================================= */

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


/* =========================================
   CREATE QUESTIONS
========================================= */

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


/* =========================================
   OPEN SUBJECT
========================================= */

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


    const tabs =
        document.querySelectorAll(
            ".tab-button"
        );


    const selected =
        Object.keys(subjects)
            .indexOf(code);


    /*
       Find tab by text/data indirectly
    */

    tabs.forEach(function (tab) {

        if (
            tab.innerText ===
            subjects[code].name
        ) {

            tab.classList.add(
                "active"
            );

        }

    });

}


/* =========================================
   CHECK COMPLETION
========================================= */

function isSubjectComplete(code) {

    for (
        let q = 1;
        q <= 10;
        q++
    ) {

        const selected =
            document.querySelector(
                `input[name="${code}_q${q}"]:checked`
            );


        if (!selected) {

            return false;

        }

    }


    return true;

}


/* =========================================
   SUBMIT
========================================= */

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


    if (
        selectedSubjects.length === 0
    ) {

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


        if (
            !isSubjectComplete(code)
        ) {

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


    console.log(
        "Submitting:",
        data
    );


    const button =
        document.getElementById(
            "submitButton"
        );


    button.disabled = true;

    button.innerText =
        "Submitting...";


    /* =========================================
       HIDDEN FORM
    ========================================= */

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


    document.body.appendChild(
        form
    );


    form.submit();


    /* =========================================
       SUCCESS
    ========================================= */

    setTimeout(
        function () {

            window.location.href =
                "success.html";

        },
        2000
    );

}
