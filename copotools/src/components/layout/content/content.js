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

const Content = () => {
    return (        
<main className="window-main">
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
          <Route path="tools/formatting/jsonprettyprinter" element={<JsonPrettyPrinter />} />
          <Route path="tools/formatting/xmlprettyprinter" element={<XmlPrettyPrinter />} />
          <Route path="tools/encryption/base64" element={<Base64EncoderDecoder />} />
          <Route path="tools/encryption/url" element={<UrlEncoderDecoder />} />
          <Route path="tools/misc/cron" element={<CronParser />} />
          <Route path="tools/encryption/jwt" element={<JwtDecoder />} />
          <Route path="tools/formatting/sqlprettyprinter" element={<SqlPrettyPrinter />} />
        </Routes>
      </div>
      <div className="window-main-body-right">
        <section className="settings-section">
        <h2 className="section-title">Settings</h2>

        <div className="input-group">
          <label className="input-label">Slug</label>
          <input type="text" className="input-field" value="what-web-designers-can-learn-from-artists-from-van-gogh-to-lloyd-wright" />
        </div>
        <div className="input-group">
          <label className="input-label">Full URL</label>
          <a href="#" className="input-url">https://bold.io/blog/what-web-designers-can-learn-from-artists-from-van-gogh-to-lloyd-wright</a>
        </div>
      </section>
      </div>
    </div>
  </main>);
}

export default Content;