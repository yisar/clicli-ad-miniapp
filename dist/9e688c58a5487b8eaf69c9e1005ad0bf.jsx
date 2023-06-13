var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var stdin_default = (props) => {
  const [state, setState] = fre.useState(props.data);
  useEffect(() => {
    setStates[2] = setState;
  }, []);
  with (state) {
    return /* @__PURE__ */ fre.h(fre.Fragment, null, /* @__PURE__ */ fre.h(comp.View, null, /* @__PURE__ */ fre.h(comp.View, {
      class: `title`
    }, '" \u5E7F\u5B50\uFF0C\u4E0B\u8F7Dc\u7AD9\u5C31\u6709\u6536\u76CA\uFF0C\u4F46\u662F\u4E00\u5B9A\u4E0D\u8981\u5145\u503C\u54E6\uFF01"'), $for(ads, (item) => /* @__PURE__ */ fre.h(comp.View, {
      class: `ad-wrap`
    }, /* @__PURE__ */ fre.h(comp.Image, {
      src: `${item.img}`
    }), /* @__PURE__ */ fre.h(comp.View, {
      class: `btm`
    }, /* @__PURE__ */ fre.h(comp.Text, {
      class: `text`
    }, item.name), /* @__PURE__ */ fre.h(comp.Button, {
      size: `mini`,
      onClick: $handleEvent("openUrl", "2", "bindtap"),
      "data-url": `${item.url}`
    }, "\u70B9\u6211\u4E0B\u8F7D")))), /* @__PURE__ */ fre.h(comp.View, {
      class: `motal`,
      style: `display:none`
    }, /* @__PURE__ */ fre.h(comp.Text, {
      class: `small`
    }, "\u8BF7\u590D\u5236\u5230\u6D4F\u89C8\u5668 ", url))));
  }
};
