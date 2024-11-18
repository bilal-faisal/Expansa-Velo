import { to } from "wix-location"
import wixData from "wix-data"

const additionalInfo = {
    // Step 1
    state1Question1: "",
    state1Question2: "",
    state1Question3: "",

    // Step 2
    state2Question1: "",

    // Step 3
    state3Question1: "",

    // Step 4.1
    step4_1Question1: "",
    step4_1Question2: "",

    // Step 4.2
    step4_2Question1: "",
    step4_2Question2: "",
    step4_2Question3: "",
    step4_2Question4: "",
    step4_2Question5: "",

    // Step 5
    step5Question1: "",

    // Step 6.1
    step6_1Question1: "",

    // Step 6.2
    step6_2Question1: "",
    step6_2Question2: "",

    // Step 7.1
    step7_1Question1: "",
    step7_1Question1File: "",
    step7_1Question2: "",
    step7_1Question2File: "",
    step7_1Question3: "",
    step7_1Question3File: "",

    // Step 7.2
    step7_2Question1: "",

    // Step 20
    step20Question1: "",

    // Other properties
    status: "review"
};


$w.onReady(function () {
    initializeStep1();
});

function initializeStep1() {
    $w("#multiStateBusinessLinstings").changeState("step1");

    $w("#boxPrevStep1").onClick(() => {
        removeErrorMessages()
        to("/")
    });

    // Question 1
    handleRepeaterSelection($w("#repeaterStep1Q1"), "#buttonChoiceStep1Q1", "state1Question1");

    // Question 2
    $w("#inputStep1Q2").onInput(() => {
        additionalInfo.state1Question2 = $w("#inputStep1Q2").value.trim();
    });

    // Question 3
    setupFileUpload("#uploadButtonStep1Q3", "state1question3", "#buttonProceedStep1", "#textErrorStep1");

    // Proceed Button
    $w("#buttonProceedStep1").onClick(() => {
        const isValid = validateStep1();
        if (isValid) {
            initializeStep2();
            console.log("additionalInfo")
            console.log(additionalInfo)
        }
    });
}

function initializeStep2() {
    $w("#multiStateBusinessLinstings").changeState("step2");

    $w("#boxPrevStep2").onClick(() => {
        removeErrorMessages()
        $w("#multiStateBusinessLinstings").changeState("step1");
    });

    // Question 1
    $w("#inputStep2Q1").onInput(() => {
        additionalInfo.state2question1 = $w("#inputStep2Q1").value.trim();
    });

    // Handle Proceed Button
    $w("#buttonProceedStep2").onClick(() => {
        const isValid = validateStep2();
        if (isValid) {
            initializeStep3();
            console.log("additionalInfo")
            console.log(additionalInfo)
        }
    });
}

function initializeStep3() {
    $w("#multiStateBusinessLinstings").changeState("step3");

    $w("#boxPrevStep3").onClick(() => {
        removeErrorMessages()
        $w("#multiStateBusinessLinstings").changeState("step2");
    });

    handleRepeaterSelection($w("#repeaterStep3Q1"), "#buttonChoiceStep3Q1", "state3Question1");

    $w("#buttonProceedStep3").onClick(() => {
        const isValid = validateStep3();
        if (isValid) {

            if (additionalInfo.state3Question1.toLocaleLowerCase() == "company") {
                initializeStep4_1()
            } else {
                initializeStep4_2()
            }

            console.log("additionalInfo");
            console.log(additionalInfo);
        }
    });
}

function initializeStep4_1() {
    $w("#multiStateBusinessLinstings").changeState("step4point1");

    $w("#boxPrevStep4-1").onClick(() => {
        removeErrorMessages()
        $w("#multiStateBusinessLinstings").changeState("step3");
    });

    // Question 1: File Upload
    setupFileUpload("#uploadButtonStep4-1Q1", "step4_1Question1", "#buttonProceedStep4-1", "#textErrorStep4-1");

    // Question 2: Multiple Choice
    handleRepeaterSelection($w("#repeaterStep4-1Q2"), "#buttonChoiceStep4-1Q2", "step4_1Question2");

    // Proceed Button
    $w("#buttonProceedStep4-1").onClick(() => {
        const isValid = validateStep4_1();
        if (isValid) {

            initializeStep5();

            console.log("additionalInfo:");
            console.log(additionalInfo);
        }
    });

}

function initializeStep4_2() {
    $w("#multiStateBusinessLinstings").changeState("step4point2");

    $w("#boxPrevStep4-2").onClick(() => {
        removeErrorMessages()
        $w("#multiStateBusinessLinstings").changeState("step3");
    });


    setupFileUpload("#uploadButtonStep4-2Q1", "step4_2Question1", "#buttonProceedStep4-2", "#textErrorStep4-2");
    setupFileUpload("#uploadButtonStep4-2Q2", "step4_2Question2", "#buttonProceedStep4-2", "#textErrorStep4-2");
    setupFileUpload("#uploadButtonStep4-2Q3", "step4_2Question3", "#buttonProceedStep4-2", "#textErrorStep4-2");
    setupFileUpload("#uploadButtonStep4-2Q4", "step4_2Question4", "#buttonProceedStep4-2", "#textErrorStep4-2");
    setupFileUpload("#uploadButtonStep4-2Q5", "step4_2Question5", "#buttonProceedStep4-2", "#textErrorStep4-2");


    $w("#buttonProceedStep4-2").onClick(() => {
        const isValid = validateStep4_2();
        if (isValid) {
            initializeStep5();

            console.log("additionalInfo:");
            console.log(additionalInfo);
        }
    });

}

function initializeStep5() {
    $w("#multiStateBusinessLinstings").changeState("step5");

    $w("#boxPrevStep5").onClick(() => {
        removeErrorMessages();
        if (additionalInfo.state3Question1.toLocaleLowerCase() === "company") {
            $w("#multiStateBusinessLinstings").changeState("step4point1");
        } else {
            $w("#multiStateBusinessLinstings").changeState("step4point2");
        }
    });

    $w("#repeaterStep5Q1").forEachItem(($item, itemData) => {
        $item("#buttonChoiceStep5Q1").onClick(() => {
            const label = $item("#buttonChoiceStep5Q1").label

            $w("#repeaterStep5Q1").forEachItem(($otherItem) => {
                $otherItem("#buttonChoiceStep5Q1").style.color = "black";
                $otherItem("#buttonChoiceStep5Q1").style.borderColor = "rgba(110, 110, 110)";
            });

            $item("#buttonChoiceStep5Q1").style.color = "#1a6aff";
            $item("#buttonChoiceStep5Q1").style.borderColor = "#1a6aff";
            additionalInfo.step5Question1 = label;

            console.log(`Selected option for step5Question1: ${label}`);

            if (label.toLocaleLowerCase() === "no") {
                initializeStep6_1();
            } else {
                initializeStep6_2();
            }
        });
    });
}

function initializeStep6_1() {
    $w("#multiStateBusinessLinstings").changeState("step6point1");

    $w("#boxPrevStep6-1").onClick(() => {
        removeErrorMessages();
        $w("#multiStateBusinessLinstings").changeState("step5");
    });

    // Handle repeater item clicks
    $w("#repeaterStep6-1Q1").forEachItem(($item, itemData) => {
        $item("#buttonChoiceStep6-1Q1").onClick(() => {
            const label = $item("#buttonChoiceStep6-1Q1").label

            $w("#repeaterStep6-1Q1").forEachItem(($otherItem) => {
                $otherItem("#buttonChoiceStep6-1Q1").style.color = "black";
                $otherItem("#buttonChoiceStep6-1Q1").style.borderColor = "rgba(110, 110, 110)";
            });

            $item("#buttonChoiceStep6-1Q1").style.color = "#1a6aff";
            $item("#buttonChoiceStep6-1Q1").style.borderColor = "#1a6aff";
            additionalInfo.step6_1Question1 = label;

            console.log(`Selected option for step6_1Question1: ${label}`);



            if (label.toLocaleLowerCase() === "yes") {
                initializeStep7_1();
            } else {
                initializeStep7_2();
            }
        });
    });
}


function initializeStep6_2() {
    $w("#multiStateBusinessLinstings").changeState("step6point2");

    $w("#boxPrevStep6-2").onClick(() => {
        removeErrorMessages();
        $w("#multiStateBusinessLinstings").changeState("step5");
    });

    $w("#inputStep6-2Q1").onInput(() => {
        additionalInfo.step6_2Question1 = $w("#inputStep6-2Q1").value.trim();
        removeErrorMessages();
    });

    setupFileUpload(
        "#uploadButtonStep6-2Q2",
        "step6_2Question2",
        "#buttonProceedStep6-2",
        "#textErrorStep6-2"
    );

    $w("#buttonProceedStep6-2").onClick(() => {
        const isValid = validateStep6_2();
        if (isValid) {

            initializeStep20();
            console.log("To terms anfd conditions");
            console.log("additionalInfo:");
            console.log(additionalInfo);
        }
    });
}

function initializeStep7_1() {
    $w("#multiStateBusinessLinstings").changeState("step7point1");

    // Navigate back to the previous step
    $w("#boxPrevStep7-1").onClick(() => {
        removeErrorMessages();
        $w("#multiStateBusinessLinstings").changeState("step6point1");
    });

    // Question 1
    setupQuestionHandler(
        $w("#repeaterStep7-1Q1"),
        "#buttonChoiceStep7-1Q1",
        "#uploadButtonStep7-1Q1",
        "step7_1Question1"
    );

    // Question 2
    setupQuestionHandler(
        $w("#repeaterStep7-1Q2"),
        "#buttonChoiceStep7-1Q2",
        "#uploadButtonStep7-1Q2",
        "step7_1Question2"
    );

    // Question 3
    setupQuestionHandler(
        $w("#repeaterStep7-1Q3"),
        "#buttonChoiceStep7-1Q3",
        "#uploadButtonStep7-1Q3",
        "step7_1Question3"
    );
}

function initializeStep8() {
    $w("#multiStateBusinessLinstings").changeState("step8");

    $w("#boxPrevStep8").onClick(() => {
        removeErrorMessages();
        $w("#multiStateBusinessLinstings").changeState("step7point1");
    });

}


// Function to handle each question
function setupQuestionHandler(repeater, buttonId, uploadButtonId, questionKey) {
    repeater.forEachItem(($item, itemData) => {
        $item(buttonId).onClick(() => {
            const label = $item(buttonId).label.toLowerCase();
            additionalInfo[questionKey] = label;


            repeater.forEachItem(($otherItem) => {
                $otherItem(buttonId).style.color = "black";
                $otherItem(buttonId).style.borderColor = "rgba(110, 110, 110)";
            });

            $item(buttonId).style.color = "#1a6aff";
            $item(buttonId).style.borderColor = "#1a6aff";



            if (label === "yes") {
                $w(uploadButtonId).expand();
            } else {
                $w(uploadButtonId).collapse();
                verifyStep7_1(); // Verify immediately if "No" is selected
            }
        });
    });

    setupFileUpload2(uploadButtonId, questionKey, null, null, verifyStep7_1);
}



// Extend setupFileUpload to handle additional verification
function setupFileUpload2(buttonId, questionKey, proceedButtonId, errorTextId, onUploadSuccess) {
    $w(buttonId).onChange(() => {
        if (proceedButtonId) $w(proceedButtonId).disable();
        removeErrorMessages();

        $w(buttonId)
            .startUpload()
            .then((file) => {
                additionalInfo[`${questionKey}File`] = file.url; // Save file URL in additionalInfo
                console.log(`${questionKey} file uploaded successfully:`, file.url);

                if (proceedButtonId) $w(proceedButtonId).enable();
                if (onUploadSuccess) onUploadSuccess(); // Trigger success callback
            })
            .catch((error) => {
                console.error(`${questionKey} file upload failed:`, error);
                if (errorTextId) displayErrorMessage($w(errorTextId), `File upload for ${questionKey} failed. Please try again.`);
                if (proceedButtonId) $w(proceedButtonId).enable();
            });
    });
}


// if (additionalInfo.step5Question1.toLocaleLowerCase() === "no") {
//     $w("#multiStateBusinessLinstings").changeState("step6point1");
// } else {
//     $w("#multiStateBusinessLinstings").changeState("step6point2");
// }

function initializeStep7_2() {
    $w("#multiStateBusinessLinstings").changeState("step7point2");

    $w("#boxPrevStep7-2").onClick(() => {
        removeErrorMessages();
        $w("#multiStateBusinessLinstings").changeState("step6point2");
    });

    $w("#inputStep7-2Q1").onInput(() => {
        additionalInfo.step7_2Question1 = $w("#inputStep7-2Q1").value.trim();
        removeErrorMessages();
    });

    $w("#buttonProceedStep7-2").onClick(() => {
        const isValid = validateStep7_2();
        if (isValid) {
            initializeStep20();

            console.log("additionalInfo:");
            console.log(additionalInfo);
        }
    });
}


function initializeStep20() {
    $w("#multiStateBusinessLinstings").changeState("step20");

    $w("#boxPrevStep20").onClick(() => {
        removeErrorMessages();
        $w("#multiStateBusinessLinstings").changeState("step6point2");
    });

    // Handle Repeater Selection
    handleRepeaterSelection($w("#repeaterStep20Q1"), "#buttonChoiceStep20Q1", "step20Question1");

    // Proceed Button
    $w("#buttonProceedStep20").onClick(() => {
        const isValid = validateStep20();
        if (isValid) {


            initializeStep21();
            console.log("additionalInfo:");
            console.log(additionalInfo);
        }
    });
}


function initializeStep21() {
    $w("#multiStateBusinessLinstings").changeState("step21");


    $w("#boxPrevStep21").onClick(() => {
        removeErrorMessages();
        $w("#multiStateBusinessLinstings").changeState("step20");
    });

    $w("#buttonPayAndProceed").onClick(async () => {
        $w("#buttonPayAndProceed").disable()
        try {
            console.log("Saving data...");
            await saveDataToDatabase();
            $w("#buttonPayAndProceed").enable()
            console.log("Data saved successfully.");

            // to("/");
        } catch (error) {
            console.error("Error saving data:", error);
            $w("#buttonPayAndProceed").enable()
            displayErrorMessage($w("#textErrorStep21"), "An error occurred while saving your data. Please try again.");
        }
    });
}

async function saveDataToDatabase() {
    ////////////////
    // Before saving clean up
    ////////////////

    if (additionalInfo.state3Question1.toLocaleLowerCase() == "company") {
        additionalInfo.step4_2Question1 = "";
        additionalInfo.step4_2Question2 = "";
        additionalInfo.step4_2Question3 = "";
        additionalInfo.step4_2Question4 = "";
        additionalInfo.step4_2Question5 = "";
    } else {
        additionalInfo.step4_1Question1 = "";
        additionalInfo.step4_1Question2 = "";
    }


    const businessListingData = {
        ...additionalInfo,
        createdAt: new Date(),
    };

    try {
        await wixData.insert("BusinessListings", businessListingData);
    } catch (error) {
        console.error("Failed to save to database:", error);
        throw error;
    }

}

// Function to handle repeater selections
function handleRepeaterSelection(repeater, buttonId, questionKey) {
    repeater.forEachItem(($item, itemData) => {
        $item(buttonId).onClick(() => {
            const label = $item(buttonId).label
            // Reset all buttons in this repeater to black
            repeater.forEachItem(($otherItem) => {
                $otherItem(buttonId).style.color = "black";
                $otherItem(buttonId).style.borderColor = "rgba(110, 110, 110)";
            });

            $item(buttonId).style.color = "#1a6aff";
            $item(buttonId).style.borderColor = "#1a6aff";
            additionalInfo[questionKey] = label;
            removeErrorMessages()
        });
    });
}

// Function to set up file upload for a specific button and field
function setupFileUpload(buttonId, questionKey, proceedButtonId, errorTextId) {
    $w(buttonId).onChange(() => {
        $w(proceedButtonId).disable();
        removeErrorMessages();
        $w(buttonId)
            .startUpload()
            .then((file) => {
                additionalInfo[questionKey] = file.url; // Save file URL in additionalInfo
                console.log(`${questionKey} file uploaded successfully:`, file.url);
                $w(proceedButtonId).enable(); // Re-enable proceed button
            })
            .catch((error) => {
                console.error(`${questionKey} file upload failed:`, error);
                displayErrorMessage($w(errorTextId), `File upload for ${questionKey} failed. Please try again.`);
                $w(proceedButtonId).enable(); // Re-enable proceed button
            });
    });
}

function validateStep1() {
    let isValid = true;

    removeErrorMessages()

    if (!additionalInfo.state1Question1) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep1"), "Please select an option for Question 1.");
    } else if (!additionalInfo.state1Question2) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep1"), "Please provide CR Number.");
    } else if (!additionalInfo.state1question3) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep1"), "Please upload a file for Commercial Registration.");
    }

    return isValid;
}

function validateStep2() {
    let isValid = true;

    removeErrorMessages();

    if (!additionalInfo.state2question1) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep2"), "Please fill in the required field.");
    }

    return isValid;
}

function validateStep3() {
    let isValid = true;

    removeErrorMessages();

    if (!additionalInfo.state3Question1) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep3"), "Please select an option for Question 1.");
    }

    return isValid;
}

function validateStep4_1() {
    let isValid = true;

    removeErrorMessages();

    if (!additionalInfo.step4_1Question1) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep4-1"), "Please upload the required file.");
    } else if (!additionalInfo.step4_1Question2) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep4-1"), "Please select an option for Question 2.");
    }

    return isValid;
}

function validateStep4_2() {
    let isValid = true;

    removeErrorMessages();

    if (!additionalInfo.step4_2Question1) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep4-2"), "Please upload the file for Question 1.");
    } else if (!additionalInfo.step4_2Question2) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep4-2"), "Please upload the file for Question 2.");
    } else if (!additionalInfo.step4_2Question3) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep4-2"), "Please upload the file for Question 3.");
    } else if (!additionalInfo.step4_2Question4) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep4-2"), "Please upload the file for Question 4.");
    } else if (!additionalInfo.step4_2Question5) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep4-2"), "Please upload the file for Question 5.");
    }

    return isValid;
}

function validateStep6_2() {
    let isValid = true;

    removeErrorMessages();

    if (!additionalInfo.step6_2Question1) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep6-2"), "Please fill in the required field.");
    } else if (!additionalInfo.step6_2Question2) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep6-2"), "Please upload the required file.");
    }

    return isValid;
}

// Function to verify if all conditions for step7_1 are met
function verifyStep7_1() {
    const allQuestionsSatisfied =
        (additionalInfo.step7_1Question1 === "no" || additionalInfo.step7_1Question1 === "yes" && additionalInfo.step7_1Question1File) &&
        (additionalInfo.step7_1Question2 === "no" || additionalInfo.step7_1Question2 === "yes" && additionalInfo.step7_1Question2File) &&
        (additionalInfo.step7_1Question3 === "no" || additionalInfo.step7_1Question3 === "yes" && additionalInfo.step7_1Question3File);

    if (allQuestionsSatisfied) {
        console.log("All questions satisfied. Proceeding to the next step...");

        console.log("additionalInfo")
        console.log(additionalInfo)

        initializeStep8()
    }
}

function validateStep7_2() {
    let isValid = true;

    removeErrorMessages();

    if (!additionalInfo.step7_2Question1) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep7-2"), "Please fill in the required field.");
    }

    return isValid;
}

function validateStep20() {
    let isValid = true;

    removeErrorMessages();

    if (!additionalInfo.step20Question1) {
        isValid = false;
        displayErrorMessage($w("#textErrorStep20"), "Please select an option for Question 1.");
    } else if (additionalInfo.step20Question1.toLowerCase() == "no") {
        isValid = false;
        displayErrorMessage($w("#textErrorStep20"), "You need to accept the terms and conditions to proceed.");
    }

    return isValid;
}

function displayErrorMessage(elem, msg) {
    elem.text = msg;
    elem.expand();
}

function removeErrorMessages() {
    $w("#textErrorStep1").collapse();
    $w("#textErrorStep1").text = "";
    $w("#textErrorStep2").collapse();
    $w("#textErrorStep2").text = "";
    $w("#textErrorStep3").collapse();
    $w("#textErrorStep3").text = "";
    $w("#textErrorStep4-1").collapse();
    $w("#textErrorStep4-1").text = "";
    $w("#textErrorStep4-2").collapse();
    $w("#textErrorStep4-2").text = "";
    $w("#textErrorStep6-2").collapse();
    $w("#textErrorStep6-2").text = "";
    $w("#textErrorStep7-2").collapse();
    $w("#textErrorStep7-2").text = "";
    $w("#textErrorStep20").collapse();
    $w("#textErrorStep20").text = "";
    $w("#textErrorStep21").collapse();
    $w("#textErrorStep21").text = "";
}