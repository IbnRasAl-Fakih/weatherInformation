const express = require("express");
const https = require("https");
const router = express.Router();
const User = require("../models/users");
const Weather = require("../models/weather");

router.get("/", (req, res) => {
    res.render("homePage", { error: "" });
});

router.get("/weather", (req, res) => {
    res.render("index");
});

router.get("/history", (req, res) => {
    res.render("history");
});

router.get("/users", (req, res) => {
    res.render("users", { error: "" });
});

router.post('/getWeatherData', (req, res) => {
    try {
        let city = req.body.city;
        let apiKey = "c47da161487447fc815193920242201";
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`;

        https.get(url, (response) => {
          let dataString = '';
    
          response.on("data", (chunk) => {
            dataString += chunk;
          });
    
          response.on("end", () => {
            res.json(JSON.parse(dataString));
          });
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/get7days', (req, res) => {
  try {
    let city = req.body.city;
    let apiKey = "65390bb99a284ae99f6db7af1d9ffaee#";
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&days=7&key=${apiKey}`;

    https.get(url, (response) => {
      let dataString = '';

      response.on("data", (chunk) => {
        dataString += chunk;
      });

      response.on("end", () => {
        res.json(JSON.parse(dataString));
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/signIn", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (user) {
          const result = req.body.password === user.password;
          if (result) {
            if (user.adminStatus == true) {
                res.redirect(`/users`);
            } else {
                res.redirect(`/weather?username=${user.name}`);
            }
          } else {
            res.render("homePage", { error: "Password doesn't match" });
          }
        } else {
          res.render("homePage", { error: "User doesn't exist" });
        }
      } catch (error) {
        res.json({ error });
      }
});

router.post("/signUp", async (req, res) => {
    try {
        let user = new User({
            name: req.body.name,
            password: req.body.password,
            adminStatus: false
        });
        const isExists = await User.findOne({ name: user.name });
        if (isExists) {
            res.render("homePage", { error: "This username is already registered" });
        } else {
            await user.save();
            if (user.name == "Rasul") {
                user.adminStatus = true;
                res.redirect(`/users`);
            } else {
                res.redirect(`/weather?username=${user.name}`);
            }
        }
    } catch (error) {
        res.json({ message: error.message });
    }
});

router.post("/updateHistory", async (req, res) => {
    try {
        const weather = new Weather({
            username: req.body.user,
            date: req.body.date,
            time: req.body.time,
            city: req.body.city,
            temperature: req.body.temperature,
            description: req.body.description,
            humidity: req.body.humidity,
            pressure: req.body.pressure,
            visibility: req.body.visibility,
            windSpeed: req.body.windSpeed,
            sunrise: req.body.sunrise,
            sunset: req.body.sunset
        });
        await weather.save();
        res.json({ message: "success" });
    } catch (error) {
        res.json({ error });
    }
});

router.post("/getHistory", async (req, res) => {
    try {
        const history = await Weather.find({ username: req.body.name });
        res.send(history);
    } catch (error) {
        res.json({ error });
    }
});

router.get("/getUsers", async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.json({ error });
    }
});

router.post("/deleteUser", async (req, res) => {
    try {
        await User.deleteOne({ name: req.body.name });
        await Weather.deleteMany({ username: req.body.name });

        res.render("users", { error: "User successfully deleted" });
      } catch (error) {
        res.json({ error });
      }
});

router.post("/editUser", async (req, res) => {
    try {
        await User.updateOne({ name: req.body.username }, { $set: {name: req.body.name, password: req.body.password, adminStatus: req.body.adminStatus} });
        console.log(req.body);
        await Weather.updateMany({ username: req.body.username }, { $set: {username: req.body.name} });
        
        res.render("users", { error: "User data successfully edited" });
      } catch (error) {
        res.json({ error });
      }
});

router.post('/getbackgrounPhoto', (req, res) => {
  try {
    let city = req.body.city;
    let apiKey = "33700213-37f1f899ac1d43b66c3693ebe";
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${city}+cityscape+building&image_type=photo&orientation=horizontal&category=buildings&min_width=1400`;

    https.get(url, (response) => {
      let dataString = '';

      response.on("data", (chunk) => {
        dataString += chunk;
      });

      response.on("end", () => {
        res.json(JSON.parse(dataString));
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;