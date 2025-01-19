import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel ,  CircularProgress } from "@mui/material";

const Game = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [userSelections, setUserSelections] = useState<any[]>([]);

  // Track counts of U, V, D selections
  const [countU, setCountU] = useState(0);
  const [countV, setCountV] = useState(0);
  const [countD, setCountD] = useState(0);
  const [submitted, setSubmitted] = useState(false); // State to track if answers are submitted
  const [response1, setResponse1] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [cansubmit, setCansubmit] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Fetch the questions from the backend API
    setLoading1(true);
    fetch("http://127.0.0.1:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading1(false)
      })
      .catch((error) => {
        setLoading1(false);
        console.error("Error fetching questions:", error)

      });
  }, []);

  const handleOptionChange = (questionIndex: number, selectedOption: string) => {
    const updatedSelections = [...userSelections];
    const previousOption = updatedSelections[questionIndex];

    // Update the selected option
    updatedSelections[questionIndex] = selectedOption;
    setUserSelections(updatedSelections);

    // Update counts (add selected option, remove previous option if changed)
    if (previousOption) {
        setCount(count-1)
      if (questions[questionIndex]['options'][previousOption].includes('U')) setCountU(countU - 1);
      if (questions[questionIndex]['options'][previousOption].includes('V')) setCountV(countV - 1);
      if (questions[questionIndex]['options'][previousOption].includes('D')) setCountD(countD - 1);
    }
    setCount(count+1)
    if (questions[questionIndex]['options'][selectedOption].includes('U')) setCountU(countU + 1);
    if (questions[questionIndex]['options'][selectedOption].includes('V')) setCountV(countV + 1);
    if (questions[questionIndex]['options'][selectedOption].includes('D')) setCountD(countD + 1);
  };

  const handleSubmit = () => {
    //setSubmitted(true); // Mark the form as submitted
    setLoading(true);

    // Calculate percentages
    const total = countU + countV + countD;
    const percentageU = ((countU / total) * 100).toFixed(2);
    const percentageV = ((countV / total) * 100).toFixed(2);
    const percentageD = ((countD / total) * 100).toFixed(2);
    const resultData = {
        
          'u': percentageU,
          'v': percentageV,
          'd': percentageD
      };

    fetch("http://127.0.0.1:5000/api/getProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData), // Send the data as JSON
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response if needed
          console.log("Server Response:", data);
          setResponse1(data);
          setSubmitted(true); // Mark the form as submitted
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error submitting answers:", error);
          setLoading(false);
        });
        console.log(response1)
        
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 3, mt: 3,alignItems: "center",height: "100vh" , marginBottom:"40px" }}>
      <Typography sx={{ fontSize: "40px", color: "white", mb: 2, fontWeight: "600" , fontFamily:"Quicksand" }}>
        Questionnaire Simulator
      </Typography>
      {loading1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {questions.map((question, index) => {
        // Group questions two per row
        const isEvenIndex = index % 2 === 0;

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
              width: "100%",
              marginBottom: 3,
              fontFamily:"Quicksand"
            }}
          >
            {isEvenIndex && (
              <>
                {/* Render the current question */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgb(17,27,39)",
                    padding: 2,
                    borderRadius: 8,
                    width: "50%",
                    fontFamily:"Quicksand"
                  }}
                >
                  <Typography sx={{ color: "white",fontFamily:"Quicksand", fontSize: "18px", marginBottom: 2 }}>
                    {questions[index].question}
                  </Typography>
                  <RadioGroup
                    aria-labelledby={`question-${index}`}
                    value={userSelections[index] || ""}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  >
                    {Object.entries(questions[index].options).map(([option, values]) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio sx={{ color: "white" }} />}
                        label={`${option}`}
                      />
                    ))}
                  </RadioGroup>
                </Box>

                {/* Render the next question if it exists */}
                {questions[index + 1] && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "rgb(17,27,39)",
                      padding: 2,
                      borderRadius: 8,
                      width: "50%",
                    }}
                  >
                    <Typography sx={{ color: "white", fontSize: "18px", marginBottom: 2 }}>
                      {questions[index + 1].question}
                    </Typography>
                    <RadioGroup
                      aria-labelledby={`question-${index + 1}`}
                      value={userSelections[index + 1] || ""}
                      onChange={(e) => handleOptionChange(index + 1, e.target.value)}
                    >
                      {Object.entries(questions[index + 1].options).map(([option, values]) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio sx={{ color: "white" }} />}
                          label={`${option}`}
                        />
                      ))}
                    </RadioGroup>
                  </Box>
                )}
              </>
            )}
          </Box>
        );
      })}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {/* Display results box after submission */}
      {submitted && response1 &&  (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(17,27,39)",
            padding: 2,
            borderRadius: 8,
            width: "80%", // Reduced width
            margin: "auto", // Center the box horizontally
            mt: 3,
            textAlign: "center", // Center text inside the box
            fontFamily:"Quicksand"
          }}
        >
          <Typography sx={{ color: "white", fontSize: "24px", marginBottom: 2,textDecoration: "underline" , fontFamily:"Quicksand" }}>
            Results
          </Typography>
          <Typography sx={{ color: "white", fontSize: "16px", marginBottom: 1 , fontFamily:"Quicksand" }}>
          Utilitariarism score: {((countU / (countU + countV + countD)) * 100).toFixed(2)}%
          </Typography>
          <Typography sx={{ color: "white", fontSize: "16px", marginBottom: 1 , fontFamily:"Quicksand" }}>
          Virtue score: {((countV / (countU + countV + countD)) * 100).toFixed(2)}%
          </Typography>
          <Typography sx={{ color: "white", fontSize: "16px", marginBottom: 3 , fontFamily:"Quicksand" }}>
          Deontological score: {((countD / (countU + countV + countD)) * 100).toFixed(2)}%
          </Typography>
          <Typography sx={{ color: "white", fontSize: "18px", marginBottom: 2 , fontFamily:"Quicksand" }}>
            Your Profile Description:
          </Typography>
          <Typography sx={{ color: "white", fontSize: "16px", marginBottom: 1 , fontFamily:"Quicksand" }}>
            {response1.response} {/* Display the profile description */}
          </Typography>
        </Box>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit} style={{
        fontFamily:"Quicksand",
        // marginBottom:3
      }} >
        Submit Answers
      </Button>
    </Box>

  );
};

export default Game;
