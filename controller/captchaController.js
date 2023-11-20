import Captcha from "node-captcha-generator";

export const generateCaptcha = async (req, res) => {
  let captcha = new Captcha({
    length: 5, // number length
    size: {
      // output size
      width: 450,
      height: 200,
    },
  });
  await captcha.toBase64(async (err, base64) => {
    if (err) {
      res.send({
        success: false,
        message: "Captcha failed to load.",
      });
    } else {
      console.log(captcha.value);
      res.send({
        success: true,
        imagePath: base64,
        value: captcha.value,
      });
    }
  });
};
