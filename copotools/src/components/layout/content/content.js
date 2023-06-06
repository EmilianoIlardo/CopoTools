import  {Route, Routes} from "react-router-dom";
import Base64EncoderDecoder from "../../../pages/encryption/base64";
import JwtDecoder from "../../../pages/encryption/jwt";
import UrlEncoderDecoder from "../../../pages/encryption/url";
import SqlPrettyPrinter from "../../../pages/formatting/prettyprint-css";
import JsonPrettyPrinter from "../../../pages/formatting/prettyprint-json";
import XmlPrettyPrinter from "../../../pages/formatting/prettyprint-xml";
import Home from "../../../pages/home/home";
import Settings from "../../../pages/settings/settings";
import CronParser from "../../../pages/misc/cron";
import ColorPicker from "../../../pages/ui/colorpicker";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import AboutComponent from "../../../pages/about/about";
import LoremIpsumGenerator from "../../../pages/ui/loremipsumgenerator";
import NumberConverterComponent from "../../../pages/conversion/number-converter";
import ImageToBase64Component from "../../../pages/ui/imagetobase64";
import  { ToastContainer, toast } from "react-toastify";
import Md5EncoderComponent from "../../../pages/encryption/md5";
import Sha256EncoderComponent from "../../../pages/encryption/sha256";
import Sha512EncoderComponent from "../../../pages/encryption/sha512";

const Content = () => {

    // TODO extract this to service
    const settingsStr = localStorage.getItem("settings");
    let settings;
    if (!settingsStr || settingsStr.length < 1 )
    {
        settings = { // set defaults
            textStorageEnabled: true,
            editorTheme: 'okaidia'
        };
        localStorage.setItem("settings", JSON.stringify(settings));
    }

    return (        
<main className="window-main">
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
  <div className="window-main-header">
      <Breadcrumbs></Breadcrumbs>
  </div>
    <div className="window-main-body">
      <div className="editor">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<AboutComponent />} />
          <Route path="tools/ui/colorpicker" element={<ColorPicker />} />
          <Route path="tools/ui/loremipsumgenerator" element={<LoremIpsumGenerator />} />
          <Route path="tools/ui/imagetobase64" element={<ImageToBase64Component />} />
          <Route path="tools/formatting/jsonprettyprinter" element={<JsonPrettyPrinter />} />
          <Route path="tools/formatting/xmlprettyprinter" element={<XmlPrettyPrinter />} />
          <Route path="tools/encryption/base64" element={<Base64EncoderDecoder />} />
          <Route path="tools/encryption/url" element={<UrlEncoderDecoder />} />
          <Route path="tools/encryption/crypto/md5" element={<Md5EncoderComponent />} />
          <Route path="tools/encryption/crypto/sha256" element={<Sha256EncoderComponent />} />
          <Route path="tools/encryption/crypto/sha512" element={<Sha512EncoderComponent />} />
          <Route path="tools/misc/cron" element={<CronParser />} />
          <Route path="tools/encryption/jwt" element={<JwtDecoder />} />
          <Route path="tools/formatting/sqlprettyprinter" element={<SqlPrettyPrinter />} />
          <Route path="tools/conversion/num" element={<NumberConverterComponent />} />
        </Routes>
      </div>
      <div className="window-main-body-right">
        <section className="settings-section">
        <h2 className="section-title">Sponsors</h2>

      </section>
      </div>
    </div>
  </main>
  );
}

export default Content;