import svgCaptcha from "svg-captcha";

export const generateCaptcha = async (req, res) => {
  const captcha = svgCaptcha.create({
    size: 5, // Number of characters in the captcha
    noise: 3, // Number of noise lines
    color: true, // Captcha text color
    background: "#f0f0f0", // Background color
    width: 150, // Image width   
    height: 60, // Image height
    fontSize: 60, // Font size

    charPreset: "abcdefghijklmnopqrstuvwxyz0123456789", // Alphanumeric characters
    textColor: "#000000", // Set text color to black
  });
  console.log(captcha.data);
  try {
    res.type("svg");
    res.send({
      success: true,
      message: "successfully captcha created.",
      data: captcha.data,
      text: captcha.text,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
