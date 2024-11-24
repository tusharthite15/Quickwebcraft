import "./index.css";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import React, { useEffect } from "react";

// ... lazy load other components similarly

function LandingPage() {
  const handleRedirect = () => {
    const userId = localStorage.getItem("userid");
    if (userId) {
      window.location.replace(`/projects/${userId}`);
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);
  
  return (
    <div className="LandingPage">
        <div className="Nav">
          <div className="Logo">Quicwebcraft</div>
          <div className="Btns">
            {/* <button>Pricing</button> */}
            <button onClick={() => (window.location.href = "/signup")}>
              Login
            </button>
          </div>
        </div>

        <div className="HeroSection">
          <div className="MainLine">
            Create a website
            <br />
            in just a <span>second!</span>
          </div>
          <div className="SubLine">Launch your website just for ₹70/month</div>
          <button onClick={() => (window.location.href = "/signup")}>
            Create your Website
          </button>
        </div>

        <div className="TrendingTemplates">
          <div className="Title">Trending Templates</div>
          <div className="templateswrap">
            <div className="templates">
              <div
                style={{
                  background:
                    "url('https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/66d0d0ff64803f2d94c6d057_dab75329-18d0-4eb0-a09e-d19e815c49dd.png')",
                  backgroundSize: "cover",
                }}
                className="templates"
              ></div>
              <div
                style={{
                  background:
                    "url('https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/66b3065770ca1ac3bf2588e3_8e53875a-1364-42e3-8f2e-de036b52a03a.jpeg')",
                  backgroundSize: "cover",
                }}
                className="templates"
              ></div>
              <div
                style={{
                  background:
                    "url('https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/66c76629e828a9e4c0effff4_04c7f610-1b1c-4508-aba9-44bf0f0974ad.png')",
                  backgroundSize: "cover",
                }}
                className="templates"
              ></div>
              <div
                style={{
                  background:
                    "url('https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/66b14006cb97ec46a0dc546d_5fadce2b-9bb6-4884-a9f7-ccf5ac6cfc7a.jpeg')",
                  backgroundSize: "cover",
                }}
                className="templates"
              ></div>
              <div
                style={{
                  background:
                    "url('https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/66b5061b66531d27bfaeb7b2_418ca19b-5e93-4813-90dd-be6f17eebb11.png')",
                  backgroundSize: "cover",
                }}
                className="mobiletemplates"
              ></div>
              <div
                style={{
                  background:
                    "url('https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/66ea453b14154935feb44731_7bd35116-71dd-4d99-9dce-d0e41322004a.jpeg')",
                  backgroundSize: "cover",
                }}
                className="templates"
              ></div>
              <div
                style={{
                  background:
                    "url('https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/66e21e1886645927bf3fa43e_1726079372374_919277708_Thumbn3ail.jpeg')",
                  backgroundSize: "cover",
                }}
                className="templates"
              ></div>
              <div
                style={{
                  background:
                    "url('https://cdn.prod.website-files.com/5e593fb060cf877cf875dd1f/66deb4dc04c9e4b49970e5a6_1725870251215_182766347_Thumbnail.jpeg')",
                  backgroundSize: "cover",
                }}
                className="templates"
              ></div>
            </div>
          </div>
        </div>

        <div className="Testimonials">
          <div className="MainLine">What People Are Saying</div>
          <div className="SubLine">
            Don't just take our word for it. Here's what real people are
            <br />
            saying about Toggl on Twitter.
          </div>

          <Marquee className="marquee" fade={true}>
            <div className="tweet">
              <div className="top">
                <div className="left">
                  <img
                    alt="img"
                    src={
                      "https://pbs.twimg.com/profile_images/1467923681905053696/PnQseNnx_normal.jpg"
                    }
                  />
                  <div className="info">
                    <div className="name">Kanishk Khurana</div>
                    <div className="username">@KanishkKhurana_</div>
                  </div>
                </div>
                <div className="right">
                  <img
                    alt="img"
                    src={
                      "https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png"
                    }
                  />
                </div>
              </div>
              <div className="msg">Looks great! Keep building🔥</div>
            </div>
            <div className="tweet">
              <div className="top">
                <div className="left">
                  <img
                    alt="img"
                    src={
                      "https://pbs.twimg.com/profile_images/1615415654013669387/NoBl-jGW_normal.jpg"
                    }
                  />
                  <div className="info">
                    <div className="name">Jake Duth</div>
                    <div className="username">@JakeDuth</div>
                  </div>
                </div>
                <div className="right">
                  <img
                    alt="img"
                    src={
                      "https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png"
                    }
                  />
                </div>
              </div>
              <div className="msg">Okay this is amazing</div>
            </div>
            <div className="tweet">
              <div className="top">
                <div className="left">
                  <img
                    alt="img"
                    src={
                      "https://pbs.twimg.com/profile_images/1833232062582546432/mjdlna28_normal.jpg"
                    }
                  />
                  <div className="info">
                    <div className="name">Fred Maia ☄️</div>
                    <div className="username">@fredmaiaarantes</div>
                  </div>
                </div>
                <div className="right">
                  <img
                    alt="img"
                    src={
                      "https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png"
                    }
                  />
                </div>
              </div>
              <div className="msg">
                I was looking for something like that yesterday. Well done and
                tks for sharing!
              </div>
            </div>
            <div className="tweet">
              <div className="top">
                <div className="left">
                  <img
                    alt="img"
                    src={
                      "https://pbs.twimg.com/profile_images/1834996898920312832/VEacRGaD_normal.jpg"
                    }
                  />
                  <div className="info">
                    <div className="name">jordi</div>
                    <div className="username">@jordienr</div>
                  </div>
                </div>
                <div className="right">
                  <img
                    alt="img"
                    src={
                      "https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png"
                    }
                  />
                </div>
              </div>
              <div className="msg">This is awesome 👏</div>
            </div>
            <div className="tweet">
              <div className="top">
                <div className="left">
                  <img
                    alt="img"
                    src={
                      "https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_normal.jpg"
                    }
                  />
                  <div className="info">
                    <div className="name">Steven Tey</div>
                    <div className="username">@steventey</div>
                  </div>
                </div>
                <div className="right">
                  <img
                    alt="img"
                    src={
                      "https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png"
                    }
                  />
                </div>
              </div>
              <div className="msg">bruh this is so good 🤤</div>
            </div>
          </Marquee>
        </div>

        {/* <div className="RightText1">
          <div className="text">
            <div className="title">
              Focus on design–everything scales automatically
            </div>
            <div className="subtitle">
              Create freely on canvas, including in pixels, with a responsive
              editor that optimizes designs for every screen size.
            </div>
          </div>
          <img
            alt="img"
            src={
              "https://res.cloudinary.com/diemfyvd7/image/upload/v1727778345/zogndacpcwntatc2upf9.jpg"
            }
          />
        </div> */}

        {/* <div className="LeftText">
          <img
            alt="img"
            src={
              "https://res.cloudinary.com/diemfyvd7/image/upload/v1727778343/dtzfgl8zv284kkb9wzem.jpg"
            }
          />
          <div className="text">
            <div className="title">
              Design in minutes, publish sites in seconds.
            </div>
            <div className="subtitle">
              Turn your ideas into a real website quickly. Select from thousands
              of free and premium website templates and customize them as you
              see fit.
            </div>
          </div>
        </div> */}

        <div className="RightText2">
          <div className="text">
            <div className="title">Develop and sell your applications</div>
            <div className="subtitle">
              Use the Blocks workspace to build widgets and interactive
              components. And monetize them on our app market, with an audience
              of 245M+ potential customers.
            </div>
          </div>
          <img
            alt="img"
            src={
              "https://res.cloudinary.com/diemfyvd7/image/upload/v1727778320/d6lehheeuvqryrayz6k1.jpg"
            }
          />
        </div>

        <div className="LastCall">
          <div className="circle"></div>

          <div className="lastform">
            <div className="title">Get Started Today and Build the Website of Your Dreams!</div>
            <button onClick={() => (window.location.href = "/signup")}>
              Get started for free
            </button>
          </div>
        </div>

        <div className="Footer">
          <div className="footerright">
            {/* <img alt="img" src={'https://i.pinimg.com/736x/bd/51/0c/bd510c9c46e3c3a1388776dfb11f5ed9.jpg'}/>
  <img alt="img" src={'https://i.pinimg.com/1200x/3e/f3/b2/3ef3b280bce4c1209e1e4376c7f452ed.jpg'}/> */}
            <img
              onClick={() => window.location.href = 'https://www.instagram.com/toggl.hq/'}
              alt="img"
              src={
                "https://www.transparentpng.com/download/logo-instagram/SKq9yH-black-and-white-instagram-logo-png.png"
              }
            />
            <img
            onClick={() => window.location.href = 'https://x.com/togglhq/'}
              alt="img"
              src={
                "https://static.vecteezy.com/system/resources/thumbnails/026/406/678/small_2x/social-media-x-logo-black-and-white-free-vector.jpg"
              }
            />
            <img
              onClick={() => window.location.href = 'https://linkedin.com/company/togglhq'}
              alt="img"
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVoaJCn9oFy4qI_1da_MTw-IKnVZy1zLe51qvhsyzmXnfJclZ0IqdfyakD5pVeajmh2F0&usqp=CAU"
              }
            />
          </div>
          <div className="links">
            <a href="/">Terms of Use</a>
            <a href="/privacy-policy">Privacy Policy</a>
            {/* <a href="/">© 2006-2024 Toggl.app, Inc</a> */}
            
          </div>
        </div>
    </div>
  );
}

export default LandingPage;
