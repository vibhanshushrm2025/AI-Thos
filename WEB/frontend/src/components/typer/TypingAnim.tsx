import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "AI-Thos",
        1000,
        "Powered By LLAMA-3.3 🤖",
        2000,
        "Agentic Moral Engine",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
        // marginTop: "20px",
      }}
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
