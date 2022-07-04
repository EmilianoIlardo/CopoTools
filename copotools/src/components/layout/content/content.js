import  {Route, Routes} from "react-router-dom";
import ColorPicker from "../../../pages/ui/colorpicker";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";

const Content = () => {
    return (        
<main className="window-main">
  <div className="window-main-header">
      <Breadcrumbs></Breadcrumbs>
  </div>
    <div className="window-main-body">
      <div className="editor">
        <Routes>
          <Route path="tools/ui/colorpicker" element={<ColorPicker />} />
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