import { Container as I, Filter as Se, Sprite as Y, Texture as st, TextStyle as Fe, Text as q, Color as ft, CanvasTextMetrics as Ue, Graphics as Ft, autoDetectRenderer as Ge } from "pixi.js";
import { GlowFilter as Xe } from "pixi-filters";
import { ArrayBufferTarget as te, FileSystemWritableFileStreamTarget as ke, Muxer as ee } from "mp4-muxer";
const U = 24;
class G extends Error {
  message;
  code;
  constructor({ message: t = "", code: e = "" }, ...i) {
    super(t, ...i), console.error(t), this.code = e, this.message = t;
  }
}
class v extends G {
}
class g extends G {
}
class si extends G {
}
class X extends G {
}
class _t extends G {
}
function Ce(o, t = U) {
  if (t < 1) throw new g({
    code: "invalidArgument",
    message: "FPS must be greater or equal to 1"
  });
  return Math.round(o * t);
}
function ii(o, t = U) {
  if (t < 1) throw new g({
    code: "invalidArgument",
    message: "FPS must be greater or equal to 1"
  });
  return Math.round(o / t * 1e3) / 1e3;
}
function E(o, t = U) {
  if (t < 1) throw new g({
    code: "invalidArgument",
    message: "FPS must be greater or equal to 1"
  });
  return Math.round(o / t * 1e3);
}
class d {
  /**
   * Time state in **milliseconds**
   */
  time;
  /**
   * Create a new timestamp from **milliseconds**
   */
  constructor(t = 0) {
    this.time = Math.round(t);
  }
  /**
   * Base unit of the timestamp
   */
  get millis() {
    return this.time;
  }
  set millis(t) {
    this.time = Math.round(t);
  }
  /**
   * Defines the time in frames at the
   * current frame rate
   */
  get frames() {
    return Ce(this.millis / 1e3);
  }
  set frames(t) {
    this.millis = E(t);
  }
  /**
   * Convert the timestamp to seconds
   */
  get seconds() {
    return this.millis / 1e3;
  }
  set seconds(t) {
    this.millis = t * 1e3;
  }
  /**
   * Equivalent to millis += x
   */
  addMillis(t) {
    return this.millis = this.millis + t, this;
  }
  /**
   * Equivalent to frames += x
   */
  addFrames(t) {
    const e = E(t);
    return this.millis = this.millis + e, this;
  }
  /**
   * add two timestamps the timestamp being added will adapt
   * its fps to the current fps
   * @returns A new Timestamp instance with the added frames
   */
  add(t) {
    return new d(t.millis + this.millis);
  }
  /**
   * subtract two timestamps timestamp being subtracted
   * will adapt its fps to the current fps
   * @returns A new Timestamp instance with the added frames
   */
  subtract(t) {
    return new d(this.millis - t.millis);
  }
  /**
   * Create a new timestamp from seconds
   */
  static fromSeconds(t) {
    const e = new d();
    return e.millis = t * 1e3, e;
  }
  /**
   * Create a new timestamp from frames
   */
  static fromFrames(t, e) {
    const i = new d();
    return i.millis = E(t, e), i;
  }
  /**
   * get a copy of the object
   */
  copy() {
    return new d(this.millis);
  }
  toJSON() {
    return this.millis;
  }
  static fromJSON(t) {
    return new d(t);
  }
}
function ni(o) {
  return Math.floor(o * 255).toString(16).padStart(2, "0").toUpperCase();
}
function oi(o, t) {
  return o.reduce(
    (e, i) => {
      const s = i[t];
      return e[s] || (e[s] = []), e[s].push(i), e;
    },
    // @ts-ignore
    {}
  );
}
function Mt(o, t) {
  return [o.slice(0, t), o.slice(t)].filter((e) => e.length > 0);
}
function tt(o, t) {
  return t ? Math.floor(Math.random() * (t - o + 1) + o) : o;
}
async function ri(o) {
  o <= 0 || await new Promise((t) => setTimeout(t, o));
}
function ai(o) {
  if (!o)
    throw "Assertion failed!";
}
function li(o, t = 300) {
  let e;
  return (...i) => {
    clearTimeout(e), e = setTimeout(() => {
      o.apply(o, i);
    }, t);
  };
}
function Ne(o, t, e) {
  e < 0 && (e = 0);
  const i = o[t];
  o.splice(t, 1), o.splice(e, 0, i);
}
function ci() {
  return crypto.randomUUID().split("-").at(0);
}
function Jt(o) {
  return typeof o != "function" ? !1 : /^class\s/.test(Function.prototype.toString.call(o));
}
function hi(o) {
  return o.charAt(0).toUpperCase() + o.slice(1);
}
function Oe(o) {
  if (o.numberOfChannels === 1)
    return o.getChannelData(0);
  const t = [];
  for (let r = 0; r < o.numberOfChannels; r++)
    t.push(o.getChannelData(r));
  const e = Math.max(...t.map((r) => r.length)), i = new Float32Array(e * o.numberOfChannels);
  let s = 0, n = 0;
  for (; n < e; )
    t.forEach((r) => {
      i[s++] = r[n] !== void 0 ? r[n] : 0;
    }), n++;
  return i;
}
function A(o, t, e) {
  for (let i = 0; i < e.length; i++)
    o.setUint8(t + i, e.charCodeAt(i));
}
function Te(o, t, e) {
  for (let i = 0; i < t.length; i++, e += 2) {
    const s = Math.max(-1, Math.min(1, t[i]));
    o.setInt16(e, s < 0 ? s * 32768 : s * 32767, !0);
  }
  return o;
}
function Ee(o, t, e) {
  const n = t * 2, r = 8, a = 36, l = o.length * 2, c = a + l, u = new ArrayBuffer(r + c), f = new DataView(u);
  return A(f, 0, "RIFF"), f.setUint32(4, c, !0), A(f, 8, "WAVE"), A(f, 12, "fmt "), f.setUint32(16, 16, !0), f.setUint16(20, 1, !0), f.setUint16(22, t, !0), f.setUint32(24, e, !0), f.setUint32(28, e * n, !0), f.setUint16(32, n, !0), f.setUint16(34, 16, !0), A(f, 36, "data"), f.setUint32(40, l, !0), Te(f, o, r + a);
}
function di(o, t = "audio/wav") {
  const e = Oe(o), i = Ee(e, o.numberOfChannels, o.sampleRate);
  return new Blob([i], { type: t });
}
function _e(o) {
  const t = new Float32Array(o.length * o.numberOfChannels);
  let e = 0;
  for (let i = 0; i < o.numberOfChannels; i++) {
    const s = o.getChannelData(i);
    t.set(s, e), e += s.length;
  }
  return t;
}
function se(o) {
  const t = o.numberOfChannels, e = o.length, i = new Int16Array(e * t);
  for (let s = 0; s < e; s++)
    for (let n = 0; n < t; n++) {
      let r = o.getChannelData(n)[s] * 32767;
      r > 32767 && (r = 32767), r < -32767 && (r = -32767), i[s * t + n] = r;
    }
  return i;
}
async function ui(o, t = 22050, e = Math.sqrt(2)) {
  const i = await o.arrayBuffer(), s = new OfflineAudioContext({ sampleRate: t, length: 1 }), n = await s.decodeAudioData(i), r = s.createBuffer(1, n.length, t);
  if (n.numberOfChannels >= 2) {
    const a = n.getChannelData(0), l = n.getChannelData(1), c = r.getChannelData(0);
    for (let u = 0; u < n.length; ++u)
      c[u] = e * (a[u] + l[u]) / 2;
    return r;
  }
  return n;
}
function Me(o, t = 44100, e = 2) {
  if (o.sampleRate == t && o.numberOfChannels == e)
    return o;
  const i = Math.floor(o.duration * t), n = new OfflineAudioContext(e, 1, t).createBuffer(e, i, t);
  for (let r = 0; r < o.numberOfChannels; r++) {
    const a = o.getChannelData(r), l = n.getChannelData(r), c = o.sampleRate / t;
    for (let u = 0; u < l.length; u++) {
      const f = u * c, p = Math.floor(f), m = Math.ceil(f);
      if (m >= a.length)
        l[u] = a[p];
      else {
        const V = f - p;
        l[u] = a[p] * (1 - V) + a[m] * V;
      }
    }
  }
  return n;
}
async function ie(o) {
  const { fps: t, height: e, width: i, bitrate: s } = o, n = [
    "avc1.640034",
    "avc1.4d0034",
    "avc1.640028",
    "avc1.640C32",
    "avc1.64001f",
    "avc1.42001E"
    // TODO: 'hev1.1.6.L93.B0', 'hev1.2.4.L93.B0', 'vp09.00.10.08', 'av01.0.04M.08', 'vp8',
  ], r = ["prefer-hardware", "prefer-software"], a = [];
  for (const c of n)
    for (const u of r)
      a.push({
        codec: c,
        hardwareAcceleration: u,
        width: i,
        height: e,
        bitrate: s,
        framerate: t
      });
  const l = [];
  if (!("VideoEncoder" in window))
    return l;
  for (const c of a) {
    const u = await VideoEncoder.isConfigSupported(c);
    u.supported && l.push(u.config ?? c);
  }
  return l.sort(Ye);
}
async function Je(o) {
  const { sampleRate: t, numberOfChannels: e, bitrate: i } = o, s = ["mp4a.40.2", "opus"], n = [];
  if (!("AudioEncoder" in window))
    return n;
  for (const r of s) {
    const a = await AudioEncoder.isConfigSupported({
      codec: r,
      numberOfChannels: e,
      bitrate: i,
      sampleRate: t
    });
    a.supported && n.push(a.config);
  }
  return n;
}
async function Le(o) {
  const t = await Je(o.audio), e = await ie(o.video);
  if (!e.length)
    throw new X({
      message: "Encoder can't be configured with any of the tested codecs",
      code: "codecsNotSupported"
    });
  return [e[0], t[0]];
}
function Ye(o, t) {
  const e = o.hardwareAcceleration ?? "", i = t.hardwareAcceleration ?? "";
  return e < i ? -1 : e > i ? 1 : 0;
}
async function ne(o, t = "untitled") {
  const e = document.createElement("a");
  if (document.head.appendChild(e), e.download = t, typeof o == "string" && o.startsWith("data:image/svg+xml;base64,")) {
    const i = o.split(",")[1], s = atob(i), n = new Array(s.length);
    for (let l = 0; l < s.length; l++)
      n[l] = s.charCodeAt(l);
    const r = new Uint8Array(n), a = new Blob([r], { type: "image/svg+xml" });
    e.href = URL.createObjectURL(a), e.download = t.split(".")[0] + ".svg";
  } else typeof o == "string" ? e.href = o : e.href = URL.createObjectURL(o);
  e.click(), e.remove();
}
async function fi(o, t = !0) {
  return new Promise((e) => {
    const i = document.createElement("input");
    i.type = "file", i.accept = o, i.multiple = t, i.onchange = (s) => {
      const n = Array.from(s.target?.files ?? []);
      e(n);
    }, i.click();
  });
}
function Lt(o) {
  return `${o.hours.toString().padStart(2, "0")}:${o.minutes.toString().padStart(2, "0")}:${o.seconds.toString().padStart(2, "0")},` + o.milliseconds.toString().padStart(3, "0");
}
function Yt(o) {
  const t = new Date(1970, 0, 1);
  return t.setSeconds(o), t.setMilliseconds(Math.round(o % 1 * 1e3)), {
    hours: t.getHours(),
    minutes: t.getMinutes(),
    seconds: t.getSeconds(),
    milliseconds: t.getMilliseconds()
  };
}
class D {
  words = [];
  constructor(t) {
    t && (this.words = t);
  }
  get duration() {
    return this.stop.subtract(this.start);
  }
  get text() {
    return this.words.map(({ text: t }) => t).join(" ");
  }
  get start() {
    return this.words.at(0)?.start ?? new d();
  }
  get stop() {
    return this.words.at(-1)?.stop ?? new d();
  }
}
var bt = /* @__PURE__ */ ((o) => (o.en = "en", o.de = "de", o))(bt || {});
class Bt {
  /**
   * Defines the text to be displayed
   */
  text;
  /**
   * Defines the time stamp at
   * which the text is spoken
   */
  start;
  /**
   * Defines the time stamp at
   * which the text was spoken
   */
  stop;
  /**
   * Defines the confidence of
   * the predicition
   */
  confidence;
  /**
   * Create a new Word object
   * @param text The string contents of the word
   * @param start Start in **milliseconds**
   * @param stop Stop in **milliseconds**
   * @param confidence Predicition confidence
   */
  constructor(t, e, i, s) {
    this.text = t, this.start = new d(e), this.stop = new d(i), this.confidence = s;
  }
  /**
   * Defines the time between start
   * and stop returned as a timestamp
   */
  get duration() {
    return this.stop.subtract(this.start);
  }
}
class T {
  id = crypto.randomUUID();
  language = bt.en;
  groups = [];
  get text() {
    return this.groups.map(({ text: t }) => t).join(" ");
  }
  get words() {
    return this.groups.flatMap(({ words: t }) => t);
  }
  constructor(t = [], e = bt.en) {
    this.groups = t, this.language = e;
  }
  /**
   * Iterate over all words in groups
   */
  *iter({ count: t, duration: e, length: i }) {
    for (const s of this.groups) {
      let n;
      for (const [r, a] of s.words.entries())
        n && (t && n.words.length >= tt(...t) ? (yield n, n = void 0) : e && n?.duration.seconds >= tt(...e) ? (yield n, n = void 0) : i && n.text.length >= tt(...i) && (yield n, n = void 0)), n ? n.words.push(a) : n = new D([a]), r == s.words.length - 1 && (yield n);
    }
  }
  /**
   * This method will optimize the transcipt for display
   */
  optimize() {
    const t = this.groups.flatMap((e) => e.words);
    for (let e = 0; e < t.length - 1; e++) {
      const i = t[e], s = t[e + 1];
      s.start.millis - i.stop.millis < 0 ? s.start.millis = i.stop.millis + 1 : i.stop.millis = s.start.millis - 1;
    }
    return this;
  }
  /**
   * Convert the transcript into a SRT compatible
   * string and downloadable blob
   */
  toSRT(t = {}) {
    let e = 1, i = "";
    for (const s of this.iter(t)) {
      const n = Yt(s.start.seconds), r = Yt(s.stop.seconds);
      i += `${e}
` + Lt(n) + " --> " + Lt(r) + `
${s.text}

`, e += 1;
    }
    return {
      text: i,
      blob: new Blob([i], { type: "text/plain;charset=utf8" })
    };
  }
  toJSON() {
    return this.groups.map(
      (t) => t.words.map((e) => ({
        token: e.text,
        start: e.start.millis,
        stop: e.stop.millis
      }))
    );
  }
  /**
   * Create a new Transcript containing the
   * first `{count}` words
   * @param count Defines the number of words required
   * @param startAtZero Defines if the first word should start at 0 milliseconds
   * @returns A new Transcript instance
   */
  slice(t, e = !0) {
    let i = 0;
    const s = [];
    for (const n of this.groups)
      for (const r of n.words)
        if (s.length == 0 && e && (i = r.start.millis), s.push(new Bt(r.text, r.start.millis - i, r.stop.millis - i)), s.length == t)
          return new T([new D(s)]);
    return new T([new D(s)]);
  }
  static fromJSON(t) {
    const e = new T();
    for (const i of t) {
      const s = new D();
      for (const n of i)
        s.words.push(new Bt(n.token, n.start, n.stop));
      e.groups.push(s);
    }
    return e;
  }
  /**
   * Fetch captions from an external resource and parse them. JSON needs
   * to be of the form `{ token: string; start: number; stop: number; }[][]`
   * @param url Location of the captions
   * @param init Additional fetch parameters such as method or headers
   * @returns A Transcript with processed captions
   */
  static async from(t, e) {
    const i = await fetch(t, e);
    if (!i.ok)
      throw new v({
        code: "unexpectedIOError",
        message: "An unexpected error occurred while fetching the file"
      });
    return T.fromJSON(await i.json());
  }
}
function et(o, t, e) {
  return o + (t - o) * e;
}
function Be(o, t, e) {
  const i = Number.parseInt(o.slice(1), 16), s = Number.parseInt(t.slice(1), 16), n = i >> 16 & 255, r = i >> 8 & 255, a = i & 255, l = s >> 16 & 255, c = s >> 8 & 255, u = s & 255, f = Math.round(et(n, l, e)), p = Math.round(et(r, c, e)), m = Math.round(et(a, u, e));
  return `#${((1 << 24) + (f << 16) + (p << 8) + m).toString(16).slice(1)}`;
}
const Ie = {
  linear: (o) => o,
  easeIn: (o) => o * o,
  easeOut: (o) => o * (2 - o),
  easeInOut: (o) => o < 0.5 ? 2 * o * o : -1 + (4 - 2 * o) * o
};
class Z {
  /**
   * Defines the range of the input values 
   * in milliseconds
   */
  input;
  /**
   * Defines the range of the output values
   */
  output;
  /**
   * Defines the required options that 
   * control the behaviour of the keyframe
   */
  options;
  /**
   * Constructs a Keyframe object.
   * @param inputRange - The range of input values (e.g., frame numbers).
   * @param outputRange - The range of output values (e.g., opacity, degrees, colors).
   * @param options - Additional options for extrapolation, type, and easing.
   */
  constructor(t, e, i = {}) {
    if (t.length !== e.length)
      throw new g({
        code: "invalidKeyframes",
        message: "inputRange and outputRange must have the same length"
      });
    this.input = t.map((s) => E(s)), this.output = e, this.options = {
      extrapolate: "clamp",
      easing: "linear",
      type: "number",
      ...JSON.parse(JSON.stringify(i))
    };
  }
  /**
   * Normalizes the frame number to a value between 0 and 1 based on the input range.
   * @param frame - The current frame number.
   * @returns The normalized value.
   */
  normalize(t) {
    const { input: e } = this;
    if (t < e[0])
      return this.options.extrapolate === "clamp" ? { t: 0, segment: 0 } : { t: (t - e[0]) / (e[1] - e[0]), segment: 0 };
    if (t > e[e.length - 1])
      return this.options.extrapolate === "clamp" ? { t: 1, segment: e.length - 2 } : { t: (t - e[e.length - 2]) / (e[e.length - 1] - e[e.length - 2]), segment: e.length - 2 };
    for (let i = 0; i < e.length - 1; i++) {
      const s = e[i], n = e[i + 1];
      if (t >= s && t <= n)
        return { t: (t - s) / (n - s), segment: i };
    }
    return { t: 0, segment: 0 };
  }
  /**
   * Interpolates the output value based on the normalized frame value.
   * @param t - The normalized frame value (between 0 and 1).
   * @param segment - The current segment index.
   * @returns The interpolated output value.
   */
  interpolate(t, e) {
    const i = this.output[e], s = this.output[e + 1], n = Ie[this.options.easing](t);
    if (typeof i == "number" && typeof s == "number")
      return et(i, s, n);
    if (typeof i == "string" && typeof s == "string")
      return Be(i, s, n);
    if (this.output.length == 1)
      return this.output[0];
    throw new g({
      code: "invalidKeyframes",
      message: "Unsupported output range types"
    });
  }
  /**
   * Evaluates the interpolated value for a given milliseconds number.
   * @param time - The current time in milliseconds or as a timestamp
   * @returns The interpolated output value.
   */
  value(t) {
    const { t: e, segment: i } = this.normalize(typeof t == "number" ? t : t.millis);
    return this.interpolate(e, i);
  }
  /**
   * Add a new keyframe to the animation
   * @param frame time of the keyframe
   * @param value value of the keyframe
   */
  push(t, e) {
    return this.input.push(E(t)), this.output.push(e), this;
  }
  toJSON() {
    return this;
  }
  static fromJSON(t) {
    const e = new Z([], []);
    return Object.assign(e, t), e;
  }
}
class x {
  /**
   * Unique identifier of the object
   */
  id = crypto.randomUUID();
  toJSON() {
    const t = {};
    return (this.constructor.__serializableProperties || []).forEach(({ propertyKey: i, serializer: s }) => {
      const n = this[i];
      s && n instanceof s ? t[i] = n.toJSON() : t[i] = n;
    }), t;
  }
  static fromJSON(t) {
    const e = new this();
    return (this.__serializableProperties || []).forEach(({ propertyKey: s, serializer: n }) => {
      if (t.hasOwnProperty(s))
        if (n) {
          const r = n.fromJSON(t[s]);
          e[s] = r;
        } else
          e[s] = t[s];
    }), e;
  }
}
function h(o) {
  return function(t, e) {
    t.constructor.__serializableProperties || (t.constructor.__serializableProperties = []), t.constructor.__serializableProperties.push({
      propertyKey: e,
      serializer: o
    });
  };
}
function k(o) {
  return class extends o {
    _handlers = {};
    on(e, i) {
      if (typeof i != "function")
        throw new Error("The callback of an event listener needs to be a function.");
      const s = crypto.randomUUID();
      return this._handlers[e] ? this._handlers[e][s] = i : this._handlers[e] = { [s]: i }, s;
    }
    off(e, ...i) {
      if (e) {
        for (const s of Object.values(this._handlers))
          e in s && delete s[e];
        for (const s of i)
          this.off(s);
      }
    }
    trigger(e, i) {
      const s = new CustomEvent(e, {
        detail: i
      });
      Object.defineProperty(s, "currentTarget", { writable: !1, value: this });
      for (const n in this._handlers[e] ?? {})
        this._handlers[e]?.[n](s);
      for (const n in this._handlers["*"] ?? {})
        this._handlers["*"]?.[n](s);
    }
    bubble(e) {
      return this.on("*", (i) => {
        e.trigger(i.type, i.detail);
      });
    }
    resolve(e) {
      return (i, s) => {
        this.on("error", s), this.on(e, i);
      };
    }
  };
}
class pt extends k(x) {
  _key;
  _value;
  _store;
  loaded = !1;
  constructor(t, e, i) {
    super(), this._store = t, this._key = e, this.initValue(i);
  }
  get key() {
    return this._key;
  }
  get value() {
    return this._value;
  }
  set value(t) {
    this._value = t, this._store.set(this._key, t), this.trigger("update", void 0);
  }
  async initValue(t) {
    t instanceof Promise ? this._value = await t : this._value = t, this.loaded = !0, this.trigger("update", void 0);
  }
}
class mi {
  storageEngine;
  namespace;
  constructor(t, e = localStorage) {
    this.storageEngine = e, this.namespace = t;
  }
  define(t, e, i) {
    const s = this.get(t);
    return s === null ? (this.set(t, e), new pt(this, t, e)) : i && s != null ? new pt(this, t, i(s)) : new pt(this, t, s);
  }
  set(t, e) {
    this.storageEngine.setItem(
      this.getStorageId(t),
      JSON.stringify({
        value: e
      })
    );
  }
  get(t) {
    const e = this.storageEngine.getItem(this.getStorageId(t));
    return e ? JSON.parse(e).value : null;
  }
  remove(t) {
    this.storageEngine.removeItem(this.getStorageId(t));
  }
  getStorageId(t) {
    return this.namespace ? `${this.namespace}.${t}` : t;
  }
}
class gi {
  worker;
  constructor(t) {
    this.worker = new t(), this.worker.onerror = console.error;
  }
  async run(t, e) {
    return this.worker.postMessage({ type: "init", ...t ?? {} }), await new Promise((i, s) => {
      this.worker.addEventListener("message", (n) => {
        e?.(n.data), n.data.type == "result" && (n.data.type = void 0, i(n.data)), n.data.type == "error" && s(n.data.message);
      });
    }).then((i) => ({ result: i, error: void 0 })).catch((i) => ({ result: void 0, error: i })).finally(() => {
      this.worker.terminate();
    });
  }
}
function wi(o) {
  return async (t) => {
    try {
      await o(t);
    } catch (e) {
      self.postMessage({
        type: "error",
        message: e?.message ?? "An unkown worker error occured"
      });
    }
  };
}
function ze() {
  return class extends k(class {
  }) {
  };
}
function Ut(o, t, e = 0) {
  if (!(o instanceof I || o instanceof Se || e == 3))
    for (const i in o) {
      const s = o[i];
      i && (s instanceof Z && (o[i] = s.value(t)), s != null && typeof s == "object" && Object.keys(s).length && Ut(s, t, e + 1));
    }
}
var je = Object.defineProperty, nt = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && je(t, e, s), s;
};
const z = class oe extends k(x) {
  _name;
  _start = new d();
  _stop = d.fromSeconds(16);
  /**
   * Defines the type of the clip
   */
  type = "base";
  /**
   * Defines the source of the clip with a
   * one-to-many (1:n) relationship
   */
  source;
  /**
   * The view that contains the render related information
   */
  view = new I();
  /**
   * Timestamp when the clip has been created
   */
  createdAt = /* @__PURE__ */ new Date();
  disabled = !1;
  /**
   * Track is ready to be rendered
   */
  state = "IDLE";
  /**
   * Access the parent track
   */
  track;
  /**
   * Human readable identifier ot the clip
   */
  get name() {
    return this._name ?? this.source?.name;
  }
  set name(t) {
    this._name = t;
  }
  /**
   * Get the first visible frame
   */
  get start() {
    return this._start;
  }
  /**
   * Get the last visible frame
   */
  get stop() {
    return this._stop;
  }
  constructor(t = {}) {
    super(), Object.assign(this, t);
  }
  /**
   * Method for connecting the track with the clip
   */
  async connect(t) {
    this.state = "ATTACHED", this.track = t, this.trigger("attach", void 0);
  }
  /**
   * Change clip's offset to zero in seconds. Can be negative
   */
  set start(t) {
    typeof t == "number" ? this.start.frames = t : this._start = t, this.start.millis >= this.stop.millis && (this.stop.millis = this.start.millis + 1), this.trigger("frame", this.start.frames);
  }
  /**
   * Set the last visible time that the
   * clip is visible
   */
  set stop(t) {
    typeof t == "number" ? this.stop.frames = t : this._stop = t, this.stop.millis <= this.start.millis && (this.start.millis = this.stop.millis - 1), this.trigger("frame", this.stop.frames);
  }
  /**
   * Offsets the clip by a given frame number
   */
  offsetBy(t) {
    return typeof t == "number" ? (this.start.addFrames(t), this.stop.addFrames(t), this.trigger("offsetBy", d.fromFrames(t))) : (this.start.addMillis(t.millis), this.stop.addMillis(t.millis), this.trigger("offsetBy", t)), this.trigger("frame", void 0), this;
  }
  /**
   * Triggered when the clip is
   * added to the composition
   */
  async init() {
  }
  /**
   * Triggered when the clip enters the scene
   */
  enter() {
  }
  /**
   * Triggered for each redraw of the scene.
   * Can return a promise which will be awaited 
   * during export.
   * @param time the current time to render
   */
  update(t) {
  }
  /**
   * Triggered when the clip exits the scene
   */
  exit() {
  }
  /**
   * Remove the clip from the track
   */
  detach() {
    return this.track?.remove(this), this;
  }
  /**
   * Split the clip into two clips at the specified time
   * @param time split, will use the current frame of the composition 
   * a fallback
   * @returns The clip that was created by performing this action
   */
  async split(t) {
    if (t || (t = this.track?.composition?.frame), typeof t == "number" && (t = d.fromFrames(t)), !t || t.millis <= this.start.millis || t.millis >= this.stop.millis)
      throw new g({
        code: "splitOutOfRange",
        message: "Cannot split clip at the specified time"
      });
    if (!this.track)
      throw new g({
        code: "trackNotAttached",
        message: "Track must be attached to a track"
      });
    const e = this.copy();
    this.stop = t.copy(), e.start = t.copy().addMillis(1), Ut(e, e.start.subtract(this.start));
    const i = this.track.clips.findIndex((s) => s.id == this.id);
    return await this.track.add(e, i + 1), e;
  }
  /**
   * Create a copy of the clip
   */
  copy() {
    return oe.fromJSON(JSON.parse(JSON.stringify(this)));
  }
  /**
   * Modify the properties of the clip and 
   * trigger an update afterwards
   */
  set(t) {
    return t && Object.assign(this, t), this.trigger("update", void 0), this;
  }
};
nt([
  h()
], z.prototype, "_name");
nt([
  h(d)
], z.prototype, "_start");
nt([
  h(d)
], z.prototype, "_stop");
nt([
  h()
], z.prototype, "disabled");
let _ = z;
var Pe = Object.defineProperty, C = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Pe(t, e, s), s;
};
class W extends k(x) {
  /**
   * Indicates if the track is loading
   */
  state = "IDLE";
  /**
   * Metadata associated with the source
   */
  metadata;
  objectURL;
  duration = d.fromSeconds(16);
  /**
   * Indicates whether the source is used inside the composition
   */
  added = !1;
  type = "base";
  name = "";
  mimeType;
  externalURL;
  external = !1;
  /**
   * Access to the data of the source
   */
  file;
  /**
   * By default this is a URL.createObjectURL proxy
   */
  async createObjectURL() {
    return this.objectURL ? this.objectURL : (this.objectURL = URL.createObjectURL(await this.getFile()), this.objectURL);
  }
  /**
   * Method for retrieving the file when 
   * it has been loaded
   * @returns The loaded file
   */
  async getFile() {
    if (!this.file && this.state == "LOADING" && await new Promise(this.resolve("load")), !this.file)
      throw new g({
        code: "fileNotAccessible",
        message: "The desired file cannot be accessed"
      });
    return this.file;
  }
  async loadFile(t) {
    this.name = t.name, this.mimeType = Wt(t.type), this.external = !1, this.file = t;
  }
  async loadUrl(t, e) {
    const i = await fetch(t, e);
    if (!i?.ok) throw new v({
      code: "unexpectedIOError",
      message: "An unexpected error occurred while fetching the file"
    });
    const s = await i.blob();
    this.name = t.toString().split("/").at(-1) ?? "", this.external = !0, this.file = new File([s], this.name, { type: s.type }), this.externalURL = t, this.mimeType = Wt(s.type);
  }
  async from(t, e) {
    try {
      this.state = "LOADING", t instanceof File ? await this.loadFile(t) : await this.loadUrl(t, e), this.state = "READY", this.trigger("load", void 0);
    } catch (i) {
      throw this.state == "ERROR", this.trigger("error", new Error(String(i))), i;
    }
    return this;
  }
  /**
   * Get the source as an array buffer
   */
  async arrayBuffer() {
    return await (await this.getFile()).arrayBuffer();
  }
  /**
   * Clean up the data associated with this object
   */
  async remove() {
    this.state = "IDLE", this.objectURL && (URL.revokeObjectURL(this.objectURL), this.objectURL = void 0), delete this.file;
  }
  /**
   * Downloads the file
   */
  async download() {
    const t = await this.getFile();
    ne(t, this.name);
  }
  /**
   * Get a visulization of the source
   * as an html element
   */
  async thumbnail() {
    return document.createElement("div");
  }
  /**
   * Create a new source for the specified input
   */
  static async from(t, e, i = new this()) {
    return i.from(t, e);
  }
}
C([
  h()
], W.prototype, "objectURL");
C([
  h()
], W.prototype, "duration");
C([
  h()
], W.prototype, "type");
C([
  h()
], W.prototype, "name");
C([
  h()
], W.prototype, "mimeType");
C([
  h()
], W.prototype, "externalURL");
C([
  h()
], W.prototype, "external");
const It = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";
function He(o) {
  const t = new TextEncoder().encode(o);
  let e = "";
  const i = t.byteLength;
  for (let s = 0; s < i; s++)
    e += String.fromCharCode(t[s]);
  return btoa(e);
}
function zt(o) {
  if (!o || !o.body) return It;
  const t = o.body.scrollWidth, e = o.body.scrollHeight, i = o.cloneNode(!0), s = i.getElementsByTagName("style").item(0), n = i.getElementsByTagName("body").item(0);
  if (n?.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), !n) return It;
  const r = new XMLSerializer(), a = s ? r.serializeToString(s) : "", l = r.serializeToString(n), c = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${e}">
		body { padding: 0; }
    ${a}
    <foreignObject width="100%" height="100%">
      ${l}
    </foreignObject>
  </svg>`;
  return "data:image/svg+xml;base64," + He(c);
}
class xt extends W {
  type = "html";
  /**
   * Access to the iframe that is required
   * for extracting the html's dimensions
   */
  iframe;
  constructor() {
    super();
    const t = document.createElement("iframe");
    t.style.position = "absolute", t.style.width = "0", t.style.height = "0", t.style.border = "0", t.style.visibility = "hidden", document.body.appendChild(t), this.iframe = t;
  }
  /**
   * Access to the html document as loaded
   * within the iframe. Can be manipulated with
   * javascript
   */
  get document() {
    return this.iframe.contentWindow?.document;
  }
  async createObjectURL() {
    return !this.file && this.state == "LOADING" && await new Promise(this.resolve("load")), this.objectURL ? this.objectURL : (this.objectURL = zt(this.document), this.objectURL);
  }
  async loadUrl(t, e) {
    await super.loadUrl(t, e), this.iframe.setAttribute("src", URL.createObjectURL(this.file)), await new Promise((i, s) => {
      this.iframe.onload = () => i(), this.iframe.onerror = (n) => s(n);
    });
  }
  async loadFile(t) {
    await super.loadFile(t), this.iframe.setAttribute("src", URL.createObjectURL(this.file)), await new Promise((e, i) => {
      this.iframe.onload = () => e(), this.iframe.onerror = (s) => i(s);
    });
  }
  /**
   * Update the object url using the current
   * contents of the iframe document
   */
  update() {
    this.objectURL && (this.objectURL = zt(this.document));
  }
  async thumbnail() {
    const t = new Image();
    return t.src = await this.createObjectURL(), t.className = "object-contain w-full aspect-video h-auto", t;
  }
}
function Ae(o, t, e, i) {
  const s = o.map((a) => 20 * Math.log10(Math.max(Math.abs(a), 1e-10))), n = [];
  let r = null;
  for (let a = 0; a < s.length; a++)
    if (s[a] < t)
      r === null && (r = a);
    else if (r !== null) {
      if ((a - r) * i / s.length >= e) {
        const c = Math.round(r * i / s.length), u = Math.round(a * i / s.length);
        n.push({
          start: new d(c),
          stop: new d(u)
        });
      }
      r = null;
    }
  if (r !== null) {
    const a = s.length - r;
    (a >= e || a == s.length) && n.push({
      start: new d(Math.round(r * i / s.length)),
      stop: new d(i)
    });
  }
  return n;
}
const Q = 3e3;
class B extends W {
  type = "audio";
  decoding = !1;
  _silences;
  transcript;
  audioBuffer;
  async decode(t = 2, e = 48e3, i = !1) {
    if (this.decoding && i && (await new Promise(this.resolve("update")), this.audioBuffer))
      return this.audioBuffer;
    this.decoding = !0;
    const s = await this.arrayBuffer(), r = await new OfflineAudioContext(t, 1, e).decodeAudioData(s);
    return this.duration.seconds = r.duration, i && (this.audioBuffer = r), this.decoding = !1, this.trigger("update", void 0), r;
  }
  /**
   * @deprecated Use fastsampler instead.
   */
  async samples(t = 60, e = 50, i = 0) {
    const s = this.audioBuffer ?? await this.decode(1, 3e3, !0), n = Math.round(s.sampleRate / e), r = s.sampleRate * s.duration - n, a = Math.ceil(r / t), l = s.getChannelData(0), c = [];
    for (let u = 0; u < r; u += a) {
      let f = 0;
      for (let p = u; p < u + n; p++)
        f += Math.abs(l[u]);
      c.push(Math.log1p(f / n * 100));
    }
    return c.map((u) => Math.round(u / Math.max(...c) * (100 - i)) + i);
  }
  /**
   * Fast sampler that uses a window size to calculate the max value of the samples in the window.
   * @param options - Sampling options.
   * @returns An array of the max values of the samples in the window.
   */
  async fastsampler({
    length: t = 60,
    start: e = 0,
    stop: i,
    logarithmic: s = !1
  } = {}) {
    typeof e == "object" && (e = e.millis), typeof i == "object" && (i = i.millis);
    const n = this.audioBuffer ?? await this.decode(1, Q, !0), r = n.getChannelData(0), a = Math.floor(Math.max(e * Q / 1e3, 0)), l = i ? Math.floor(Math.min(i * Q / 1e3, n.length)) : n.length, c = Math.floor((l - a) / t), u = new Float32Array(t);
    for (let f = 0; f < t; f++) {
      const p = a + f * c, m = p + c;
      let V = -1 / 0;
      for (let w = p; w < m; w++) {
        const Et = r[w];
        Et > V && (V = Et);
      }
      u[f] = s ? Math.log2(1 + V) : V;
    }
    return u;
  }
  async thumbnail(...t) {
    const e = await this.samples(...t), i = document.createElement("div");
    i.className = "flex flex-row absolute space-between inset-0 audio-samples";
    for (const s of e) {
      const n = document.createElement("div");
      n.className = "audio-sample-item", n.style.height = `${s}%`, i.appendChild(n);
    }
    return i;
  }
  /**
   * Find silences in the audio clip. Results are cached.
   * 
   * uses default sample rate of 3000
   * @param options - Silences options.
   * @returns An array of the silences (in ms) in the clip.
   */
  async silences({
    threshold: t = -50,
    minDuration: e = 100,
    windowSize: i = 50
  } = {}) {
    if (this._silences) return this._silences;
    const s = this.audioBuffer ?? await this.decode(1, Q, !0), n = Math.floor(s.length / i), r = await this.fastsampler({ length: n, logarithmic: !1 }), a = Ae(r, t, e, this.duration.millis);
    return this._silences = a, a;
  }
}
class Zt extends W {
  type = "image";
  async thumbnail() {
    const t = new Image();
    return t.src = await this.createObjectURL(), t.className = "object-cover w-full aspect-video h-auto", t;
  }
}
class Vt extends B {
  type = "video";
  downloadInProgress = !0;
  async loadUrl(t, e) {
    const i = await fetch(t, e);
    if (!i?.ok) throw new v({
      code: "unexpectedIOError",
      message: "An unexpected error occurred while fetching the file"
    });
    this.name = t.toString().split("/").at(-1) ?? "", this.external = !0, this.externalURL = t, this.objectURL = String(t), this.mimeType = Wt(i.headers.get("Content-type")), this.getBlob(i);
  }
  async getFile() {
    if (!this.file && this.downloadInProgress && await new Promise(this.resolve("load")), !this.file)
      throw new g({
        code: "fileNotAccessible",
        message: "The desired file cannot be accessed"
      });
    return this.file;
  }
  async thumbnail() {
    const t = document.createElement("video");
    return t.className = "object-cover w-full aspect-video h-auto", t.controls = !1, t.addEventListener("loadedmetadata", () => {
      this.duration.seconds = t.duration, this.trigger("update", void 0);
    }), t.addEventListener("mousemove", (e) => {
      const i = e.currentTarget, s = i?.getBoundingClientRect(), n = e.clientX - (s?.left ?? 0), r = i?.duration;
      r && s && s.width > 0 && (i.currentTime = Math.round(r * (n / s.width)));
    }), t.src = await this.createObjectURL(), t;
  }
  async getBlob(t) {
    try {
      this.downloadInProgress = !0;
      const e = await t.blob();
      this.file = new File([e], this.name, { type: e.type }), this.trigger("load", void 0);
    } catch (e) {
      this.state == "ERROR", this.trigger("error", new Error(String(e)));
    } finally {
      this.downloadInProgress = !1;
    }
  }
}
class yi {
  static fromType(t) {
    switch (t.type) {
      case "video":
        return new vt();
      case "audio":
        return new it();
      case "html":
        return new At();
      case "image":
        return new jt();
      case "text":
        return new P();
      case "complex_text":
        return new H();
      default:
        return new _();
    }
  }
  static fromSource(t) {
    if (t.type == "audio" && t instanceof B)
      return new it(t);
    if (t.type == "video" && t instanceof Vt)
      return new vt(t);
    if (t.type == "image" && t instanceof Zt)
      return new jt(t);
    if (t.type == "html" && t instanceof xt)
      return new At(t);
  }
}
class De {
  static fromJSON(t) {
    return [new d(t[0]), new d(t[1])];
  }
}
var Qe = Object.defineProperty, Ke = Object.getOwnPropertyDescriptor, M = (o, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Ke(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && Qe(t, e, s), s;
};
const N = class re extends _ {
  source = new B();
  _offset = new d();
  /**
   * Is the media currently playing
   */
  playing = !1;
  duration = new d();
  range = [new d(), this.duration];
  constructor(t = {}) {
    super(), Object.assign(this, t);
  }
  get transcript() {
    return this.source.transcript;
  }
  set transcript(t) {
    this.source.transcript = t;
  }
  get start() {
    return this.range[0].add(this.offset);
  }
  get stop() {
    return this.range[1].add(this.offset);
  }
  set start(t) {
    typeof t == "number" && (t = d.fromFrames(t));
    const e = t.subtract(this.offset);
    e.millis >= 0 && e.millis < this.range[1].millis ? this.range[0].millis = e.millis : e.millis < 0 ? this.range[0].millis = 0 : this.range[0].millis = this.range[1].millis - 1, this.trigger("frame", void 0);
  }
  set stop(t) {
    typeof t == "number" && (t = d.fromFrames(t));
    const e = t.subtract(this.offset);
    e.millis > this.range[0].millis && e.millis <= this.duration.millis ? this.range[1] = e : e.millis > this.duration.millis ? this.range[1] = this.duration : this.range[1].millis = this.range[0].millis + 1, this.trigger("frame", void 0);
  }
  /**
   * Offest from frame 0 of the composition
   */
  get offset() {
    return this._offset;
  }
  /**
   * Change clip's offset to zero in frames. Can be negative
   */
  set offset(t) {
    typeof t == "number" ? this._offset.frames = t : this._offset = t, this.trigger("frame", this.offset.frames);
  }
  /**
   * Offsets the clip by a given frame number
   */
  offsetBy(t) {
    return typeof t == "number" ? (this.offset.addFrames(t), this.trigger("offsetBy", d.fromFrames(t))) : (this.offset.addMillis(t.millis), this.trigger("offsetBy", t)), this.trigger("frame", void 0), this;
  }
  get muted() {
    return this.element?.muted ?? !1;
  }
  set muted(t) {
    this.element && (this.element.muted = t);
  }
  /**
   * Set the media playback to a given time
   */
  seek(t) {
    return new Promise((e, i) => {
      if (!this.element)
        return i(
          new _t({
            code: "elementNotDefined",
            message: "Cannot seek on undefined element"
          })
        );
      (t.millis < this.start.millis || t.millis > this.stop.millis) && (t = this.start), this.element.onerror = () => i(this.element?.error), this.element.pause(), this.element.currentTime = t.subtract(this.offset).seconds, this.element.onseeked = () => e();
    });
  }
  /**
   * Returns a slice of a media clip with trimmed start and stop
   */
  subclip(t, e) {
    if (t || (t = this.range[0]), e || (e = this.range[1]), typeof t == "number" && (t = d.fromFrames(t)), typeof e == "number" && (e = d.fromFrames(e)), t.millis >= e.millis)
      throw new g({
        code: "invalidKeyframe",
        message: "Start can't lower than or equal the stop"
      });
    return t.millis < 0 && (this.range[0].millis = 0, t = this.range[0]), e.millis > this.duration.millis && this.duration.millis && (e = this.duration), this.range = [t, e], this.trigger("frame", void 0), this;
  }
  get volume() {
    return this.element?.volume ?? 1;
  }
  set volume(t) {
    this.element && (this.element.volume = t);
  }
  copy() {
    const t = re.fromJSON(JSON.parse(JSON.stringify(this)));
    return t.source = this.source, t;
  }
  async split(t) {
    if (t || (t = this.track?.composition?.frame), typeof t == "number" && (t = d.fromFrames(t)), !t || t.millis <= this.start.millis || t.millis >= this.stop.millis)
      throw new g({
        code: "invalidKeyframe",
        message: "Cannot split clip at the specified time"
      });
    if (!this.track)
      throw new _t({
        code: "trackNotDefined",
        message: "Clip must be attached to a track"
      });
    t = t.subtract(this.offset);
    const e = this.copy();
    this.range[1] = t.copy(), e.range[0] = t.copy().addMillis(1), Ut(e, e.start.subtract(this.start));
    const i = this.track.clips.findIndex((s) => s.id == this.id);
    return await this.track.add(e, i + 1), e;
  }
  /**
   * Generates a new caption track for the current clip using the specified captioning strategy.
   * @param strategy An optional CaptionPresetStrategy to define how captions should be generated.
   */
  async addCaptions(t) {
    if (!this.track?.composition)
      throw new g({
        code: "compositionNotDefined",
        message: "Captions can only be generated after the clip has been added to the composition"
      });
    return await this.track.composition.createTrack("caption").from(this).generate(t);
  }
  set(t) {
    return super.set(t);
  }
  /**
   * @deprecated use `addCaptions` instead
   */
  async generateCaptions(t) {
    return this.addCaptions(t);
  }
};
M([
  h(d)
], N.prototype, "_offset", 2);
M([
  h(d)
], N.prototype, "duration", 2);
M([
  h(De)
], N.prototype, "range", 2);
M([
  h(T)
], N.prototype, "transcript", 1);
M([
  h()
], N.prototype, "muted", 1);
M([
  h()
], N.prototype, "volume", 1);
let ot = N;
class K {
  static fromJSON(t) {
    return typeof t == "object" ? Z.fromJSON(t) : t;
  }
}
class mt {
  static fromJSON(t) {
    return typeof t.x == "object" && (t.x = Z.fromJSON(t.x)), typeof t.y == "object" && (t.y = Z.fromJSON(t.y)), t;
  }
}
let $e = class {
  target;
  animation;
  constructor(t) {
    this.target = t;
  }
  init(t, e, i = 0, s) {
    if (!(t in this.target))
      throw new Error(`Property [${String(t)}] cannot be assigned`);
    const n = [i], r = [e];
    typeof this.target[t] == typeof e && i != 0 && (n.unshift(0), r.unshift(this.target[t])), this.target[t] = this.animation = new Z(n, r, { easing: s });
  }
};
function qe(o) {
  const t = new Proxy(o, {
    get(e, i) {
      return i == "to" ? (s, n) => {
        if (!e.animation)
          throw new g({
            code: "undefinedKeyframe",
            message: "Cannot use 'to() before selecting a property"
          });
        const a = new d(e.animation.input.at(-1)).frames + n;
        return e.animation.push(a, s), t;
      } : (s, n, r) => (e.init(i, s, n, r), t);
    }
  });
  return t;
}
class ts extends $e {
}
var es = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, F = (o, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? ss(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && es(t, e, s), s;
};
function rt(o) {
  class t extends o {
    /**
     * Apply one or more `Pixi.js` filters to the clip. 
     * @example 
     * clip.filters = [new BlurFilter()];
     */
    filters;
    _height;
    _width;
    _position = {
      x: this.view.position.x,
      y: this.view.position.y
    };
    _scale;
    rotation = this.view.angle;
    alpha = 1;
    translate = { x: 0, y: 0 };
    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     * @default { x: 0, y: 0 }
     */
    get position() {
      return this._position;
    }
    set position(i) {
      typeof i == "string" ? (this._position = { x: "50%", y: "50%" }, this.anchor = { x: 0.5, y: 0.5 }) : this._position = i;
    }
    /**
     * The scale factors of this object along the local coordinate axes.
     * Will be added to the scale applied by setting height and/or width
     * @default { x: 1, y: 1 }
     */
    get scale() {
      return this._scale ?? {
        x: this.view.scale.x,
        y: this.view.scale.y
      };
    }
    set scale(i) {
      typeof i == "number" || i instanceof Z || typeof i == "function" ? this._scale = { x: i, y: i } : this._scale = i;
    }
    /**
     * The position of the clip on the x axis relative. 
     * An alias to position.x
     * @default 0
     */
    get x() {
      return this._position.x;
    }
    set x(i) {
      this._position.x = i;
    }
    /**
     * The position of the clip on the y axis. An alias to position.y
     * @default 0
     */
    get y() {
      return this._position.y;
    }
    set y(i) {
      this._position.y = i;
    }
    /**
     * Offset relative to the x position
     * @default 0
     */
    get translateX() {
      return this.translate.x;
    }
    set translateX(i) {
      this.translate.x = i;
    }
    /**
     * Offset relative to the y position
     * @default 0
     */
    get translateY() {
      return this.translate.y;
    }
    set translateY(i) {
      this.translate.y = i;
    }
    /**
     * The height of the clip/container
     */
    get height() {
      return this._height ?? this.view.height;
    }
    set height(i) {
      this._height = i;
    }
    /**
     * The width of the clip/container
     */
    get width() {
      return this._width ?? this.view.width;
    }
    set width(i) {
      this._width = i;
    }
    /**
     * The mask to apply to the clip
     */
    get mask() {
      return this.view.mask;
    }
    set mask(i) {
      this.view.mask = i ?? null;
    }
    get anchor() {
      return this.view.children[0] instanceof Y ? {
        x: this.view.children[0].anchor.x,
        y: this.view.children[0].anchor.y
      } : { x: 0, y: 0 };
    }
    set anchor(i) {
      const s = typeof i == "number" ? { x: i, y: i } : i;
      for (const n of this.view.children)
        n instanceof Y && n.anchor.set(s.x, s.y);
    }
    enter() {
      this.filters && !this.view.filters && (this.view.filters = this.filters);
    }
    exit() {
      this.filters && this.view.filters && (this.view.filters = null);
    }
    animate() {
      return qe(
        new ts(this)
      );
    }
  }
  return F([
    h(K)
  ], t.prototype, "_height", 2), F([
    h(K)
  ], t.prototype, "_width", 2), F([
    h(mt)
  ], t.prototype, "_position", 2), F([
    h(mt)
  ], t.prototype, "_scale", 2), F([
    h(K)
  ], t.prototype, "rotation", 2), F([
    h(K)
  ], t.prototype, "alpha", 2), F([
    h(mt)
  ], t.prototype, "translate", 2), F([
    h()
  ], t.prototype, "anchor", 1), t;
}
function at(o, t, e) {
  const i = e.value;
  return e.value = function(...s) {
    const n = s[0].subtract(this.start), r = {
      width: this.track?.composition?.width ?? 1920,
      height: this.track?.composition?.height ?? 1080
    };
    let a;
    typeof this.translate.x == "number" ? a = this.translate.x : typeof this.translate.x == "function" ? a = this.translate.x.bind(this)(n) : a = this.translate.x.value(n);
    let l;
    typeof this.translate.y == "number" ? l = this.translate.y : typeof this.translate.y == "function" ? l = this.translate.y.bind(this)(n) : l = this.translate.y.value(n);
    let c;
    typeof this._position.x == "number" ? c = this._position.x : typeof this._position.x == "string" ? c = Number.parseFloat(this._position.x) * r.width / 100 : typeof this._position.x == "function" ? c = this._position.x.bind(this)(n) : c = this._position.x.value(n);
    let u;
    if (typeof this._position.y == "number" ? u = this._position.y : typeof this._position.y == "string" ? u = Number.parseFloat(this._position.y) * r.height / 100 : typeof this._position.y == "function" ? u = this._position.y.bind(this)(n) : u = this._position.y.value(n), this.view.position.set(c + a, u + l), typeof this._height == "string" ? this.view.height = Math.round(Number.parseFloat(this._height) * r.height / 100) : typeof this._height == "object" ? this.view.height = this._height.value(n) : typeof this._height == "function" ? this.view.height = this._height.bind(this)(n) : this._height && (this.view.height = this._height), this._height && !this._width && this.view.scale.set(this.view.scale.y), typeof this._width == "string" ? this.view.width = Math.round(Number.parseFloat(this._width) * r.width / 100) : typeof this._width == "object" ? this.view.width = this._width.value(n) : typeof this._width == "function" ? this.view.width = this._width.bind(this)(n) : this._width && (this.view.width = this._width), this._width && !this._height && this.view.scale.set(this.view.scale.x), this._scale) {
      let f;
      typeof this._scale.x == "number" ? f = this._scale.x : typeof this._scale.x == "function" ? f = this._scale.x.bind(this)(n) : f = this._scale.x.value(n);
      let p;
      typeof this._scale.y == "number" ? p = this._scale.y : typeof this._scale.y == "function" ? p = this._scale.y.bind(this)(n) : p = this._scale.y.value(n), (this._width || this._height) && (f *= this.view.scale._x, p *= this.view.scale._y), this.view.scale.set(f, p);
    }
    return typeof this.rotation == "number" ? this.view.angle = this.rotation : typeof this.rotation == "function" ? this.view.angle = this.rotation.bind(this)(n) : this.view.angle = this.rotation.value(n), typeof this.alpha == "number" ? this.view.alpha = this.alpha : typeof this.alpha == "function" ? this.view.alpha = this.alpha.bind(this)(n) : this.view.alpha = this.alpha.value(n), i.apply(this, s);
  }, e;
}
var is = Object.defineProperty, ns = Object.getOwnPropertyDescriptor, os = (o, t, e, i) => {
  for (var s = ns(t, e), n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && is(t, e, s), s;
};
const ae = class le extends rt(_) {
  type = "image";
  element = new Image();
  source = new Zt();
  /**
   * Access to the sprite containing the image texture
   */
  sprite = new Y();
  constructor(t, e = {}) {
    super(), this.view.addChild(this.sprite), t instanceof Zt && (this.source = t), t instanceof File && this.source.from(t), Object.assign(this, e);
  }
  async init() {
    this.element.setAttribute("src", await this.source.createObjectURL()), await new Promise((t, e) => {
      this.element.onload = () => {
        this.sprite.texture = st.from(this.element), this.state = "READY", t();
      }, this.element.onerror = (i) => {
        console.error(i), this.state = "ERROR", e(new v({
          code: "sourceNotProcessable",
          message: "An error occurred while processing the input medium."
        }));
      };
    });
  }
  update(t) {
  }
  copy() {
    const t = le.fromJSON(JSON.parse(JSON.stringify(this)));
    return t.filters = this.filters, t.source = this.source, t;
  }
};
os([
  at
], ae.prototype, "update");
let jt = ae;
const $ = {
  "The Bold Font": {
    weights: ["500"],
    url: "https://diffusion-studio-public.s3.eu-central-1.amazonaws.com/fonts/the-bold-font.ttf"
  },
  "Komika Axis": {
    weights: ["400"],
    url: "https://diffusion-studio-public.s3.eu-central-1.amazonaws.com/fonts/komika-axis.ttf"
  },
  Geologica: {
    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    url: "https://fonts.gstatic.com/s/geologica/v1/oY1l8evIr7j9P3TN9YwNAdyjzUyDKkKdAGOJh1UlCDUIhAIdhCZOn1fLsig7jfvCCPHZckUWE1lELWNN-w.woff2"
  },
  Figtree: {
    weights: ["300", "400", "500", "600", "700", "800", "900"],
    url: "https://fonts.gstatic.com/s/figtree/v5/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2"
  },
  Urbanist: {
    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    url: "https://fonts.gstatic.com/s/urbanist/v15/L0x-DF02iFML4hGCyMqlbS1miXK2.woff2"
  },
  Montserrat: {
    weights: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    url: "https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2"
  },
  Bangers: {
    weights: ["400"],
    url: "https://fonts.gstatic.com/s/bangers/v20/FeVQS0BTqb0h60ACH55Q2J5hm24.woff2"
  },
  Chewy: {
    weights: ["400"],
    url: "https://fonts.gstatic.com/s/chewy/v18/uK_94ruUb-k-wn52KjI9OPec.woff2"
  },
  "Source Code Pro": {
    weights: ["200", "300", "400", "500", "600", "700", "800", "900"],
    url: "https://fonts.gstatic.com/s/sourcecodepro/v22/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevWnsUnxg.woff2"
  }
};
var rs = Object.defineProperty, lt = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && rs(t, e, s), s;
};
const j = class Rt extends k(x) {
  /**
   * Defines if the font has been loaded yet
   */
  loaded = !1;
  constructor(t) {
    super(), t?.source.startsWith("https://") && (t.source = `url(${t.source})`), this.family = t?.family ?? "Arial", this.source = t?.source, this.style = t?.style, this.weight = t?.weight;
  }
  get name() {
    return this.family + " " + (this.style ?? this.weight);
  }
  family;
  weight;
  source;
  style;
  /**
   * Load the font that has been initiated via the constructor
   */
  async load() {
    if (this.loaded || !this.source || !this.family)
      return this;
    const t = new FontFace(this.name, this.source);
    return this.weight && (t.weight = this.weight), await new Promise((e) => {
      t.load().then((i) => {
        document.fonts.add(i), e(null);
      });
    }), this.loaded = !0, this.trigger("load", void 0), this;
  }
  copy() {
    const t = Rt.fromJSON(JSON.parse(JSON.stringify(this)));
    return t.loaded = this.loaded, t;
  }
  /**
   * Get all available local fonts, requires the
   * **Local Font Access API**
   */
  static async localFonts() {
    const t = {};
    "queryLocalFonts" in window || Object.assign(window, { queryLocalFonts: () => [] });
    for (const e of await window.queryLocalFonts()) {
      if (e.family in t) {
        t[e.family].push(e);
        continue;
      }
      t[e.family] = [e];
    }
    return Object.keys(t).map((e) => ({
      family: e,
      variants: t[e].map((i) => ({
        family: e,
        style: i.style,
        source: `local('${i.fullName}'), local('${i.postscriptName}')`
      }))
    }));
  }
  /**
   * Get common web fonts
   */
  static webFonts() {
    return Object.keys($).map((t) => ({
      family: t,
      variants: $[t].weights.map((e) => ({
        family: t,
        source: `url(${$[t].url})`,
        weight: e
      }))
    }));
  }
  /**
   * Create a font by font family
   */
  static fromFamily({
    family: t,
    weight: e
  }) {
    return new Rt({
      family: t,
      source: `url(${$[t].url})`,
      weight: e
    });
  }
};
lt([
  h()
], j.prototype, "family");
lt([
  h()
], j.prototype, "weight");
lt([
  h()
], j.prototype, "source");
lt([
  h()
], j.prototype, "style");
let S = j;
const R = 4, ce = {
  center: 0.5,
  justify: 0.5,
  left: 0,
  right: 1
}, he = {
  alphabetic: 0,
  top: 0,
  middle: 0.5,
  hanging: 1,
  bottom: 1,
  ideographic: 1
};
var as = Object.defineProperty, ls = Object.getOwnPropertyDescriptor, b = (o, t, e, i) => {
  for (var s = ls(t, e), n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && as(t, e, s), s;
};
const y = class de extends rt(_) {
  type = "text";
  _text = "";
  _textCase;
  _anchor = { x: 0, y: 0 };
  _font = new S();
  style = new Fe({
    fill: "#FFFFFF",
    fontFamily: this._font.family,
    fontSize: 16
  });
  constructor(t) {
    super(), this.style.padding = 20, typeof t == "string" ? (this.text = t, this.reflectUpdate()) : t && (Object.assign(this, t), this.reflectUpdate()), this.on("update", this.reflectUpdate.bind(this));
  }
  get text() {
    return this._text;
  }
  set text(t) {
    if (this._text = t, !this.view.children.length) {
      const e = new q({
        text: this.transformedText,
        style: this.style,
        resolution: R,
        scale: R
      });
      this.view.addChild(e);
    }
    this.view.children[0] instanceof q && this.transformedText && (this.view.children[0].text = this.transformedText);
  }
  get name() {
    return this._text;
  }
  get font() {
    return this._font;
  }
  set font(t) {
    if (this._font = t, t.loaded) {
      this.style.fontFamily = t.name;
      return;
    }
    this._font.load().then(() => {
      this.style.fontFamily = t.name, this.trigger("update", void 0);
    });
  }
  get maxWidth() {
    if (this.style.wordWrap)
      return this.style.wordWrapWidth * R;
  }
  set maxWidth(t) {
    t ? (this.style.wordWrap = !0, this.style.wordWrapWidth = t / R) : this.style.wordWrap = !1;
  }
  get textAlign() {
    return this.style.align;
  }
  set textAlign(t) {
    this.style.align = t, this.anchor.x = ce[t];
  }
  get padding() {
    return this.style.padding;
  }
  set padding(t) {
    this.style.padding = t;
  }
  get textBaseline() {
    return this.style.textBaseline;
  }
  set textBaseline(t) {
    this.style.textBaseline = t, this.anchor.y = he[t];
  }
  get fillStyle() {
    const { fill: t } = this.style;
    return new ft(t.toString()).toHex().toUpperCase();
  }
  set fillStyle(t) {
    this.style.fill = t;
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(t) {
    typeof t == "number" ? this._anchor = { x: t, y: t } : this._anchor = t;
  }
  get stroke() {
    if (!this.style.stroke)
      return;
    let {
      color: t = "#000000",
      alpha: e = 1,
      width: i = 3,
      join: s = "round",
      miterLimit: n
    } = this.style.stroke;
    return t = new ft(t).toHex().toUpperCase(), { color: t, alpha: e, width: i, join: s, miterLimit: n };
  }
  set stroke(t) {
    if (!t) {
      this.style.stroke = void 0;
      return;
    }
    const { color: e = "#000000", alpha: i = 1, width: s = 3, join: n = "round", miterLimit: r } = t;
    this.style.stroke = { color: e, alpha: i, width: s, join: n, miterLimit: r };
  }
  get textCase() {
    return this._textCase;
  }
  set textCase(t) {
    this._textCase = t, this.view.children[0] instanceof q && this.transformedText && (this.view.children[0].text = this.transformedText);
  }
  get shadow() {
    if (!this.style.dropShadow)
      return;
    const { alpha: t, angle: e, blur: i, color: s, distance: n } = this.style.dropShadow, r = new ft(s).toHex().toUpperCase();
    return { alpha: t, angle: e, blur: i, color: r, distance: n };
  }
  set shadow(t) {
    t ? this.style.dropShadow = t : this.style.dropShadow = !1;
  }
  /**
   * The font family, can be a single font name, or a list of names where the first is the preferred font.
   */
  get fontFamily() {
    return Array.isArray(this.style.fontFamily) ? this.style.fontFamily[0] : this.style.fontFamily;
  }
  get fontSize() {
    return this.style.fontSize;
  }
  set fontSize(t) {
    this.style.fontSize = t;
  }
  get leading() {
    return this.style.leading;
  }
  set leading(t) {
    this.style.leading = t;
  }
  update(t) {
  }
  copy() {
    const t = de.fromJSON(JSON.parse(JSON.stringify(this)));
    return t.filters = this.filters, t.font = this.font, t;
  }
  get transformedText() {
    return this.textCase == "lower" ? this._text.toLocaleLowerCase() : this.textCase == "upper" ? this._text.toUpperCase() : this._text;
  }
  reflectUpdate() {
    const t = this.view.children[0]?.width ?? 0, e = this.view.children[0]?.height ?? 0, i = (this.style.dropShadow?.distance ?? 0) * R;
    this.view.pivot = {
      x: (t - i) * this._anchor.x,
      y: (e - i) * this._anchor.y
    };
  }
  set(t) {
    return super.set(t);
  }
};
b([
  h()
], y.prototype, "text");
b([
  h(S)
], y.prototype, "font");
b([
  h()
], y.prototype, "maxWidth");
b([
  h()
], y.prototype, "textAlign");
b([
  h()
], y.prototype, "padding");
b([
  h()
], y.prototype, "textBaseline");
b([
  h()
], y.prototype, "fillStyle");
b([
  h()
], y.prototype, "anchor");
b([
  h()
], y.prototype, "stroke");
b([
  h()
], y.prototype, "textCase");
b([
  h()
], y.prototype, "shadow");
b([
  h()
], y.prototype, "fontSize");
b([
  h()
], y.prototype, "leading");
b([
  at
], y.prototype, "update");
let P = y;
function gt(o) {
  const t = o.split(" ").map((e) => `${e} `);
  return t[t.length - 1] = t[t.length - 1].replace(/ $/, ""), t;
}
const cs = {
  get(o, t) {
    const e = o[t];
    return typeof e == "number" ? e * R : Array.isArray(e) && typeof e[0] == "number" ? e.map((i) => i * R) : e;
  }
};
function hs(o) {
  return new Proxy(o, cs);
}
class ds {
  tokens = [];
  get width() {
    return this.tokens.reduce((t, e) => t + e.metrics.lineWidths[0], 0);
  }
  get height() {
    return Math.max(...this.tokens.map((t) => t.metrics.lineHeight));
  }
}
class Pt {
  lines = [];
  get width() {
    return Math.max(...this.lines.map((t) => t.width));
  }
  get height() {
    return this.lines.reduce((t, e) => t + e.height, 0);
  }
}
class us {
  static fromJSON(t) {
    return t.map((e) => (e.font && (e.font = S.fromJSON(e.font)), e));
  }
}
var fs = Object.defineProperty, ps = Object.getOwnPropertyDescriptor, J = (o, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? ps(t, e) : t, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && fs(t, e, s), s;
};
const O = class ue extends P {
  type = "complex_text";
  _maxWidth;
  _textAlign = "left";
  _textBaseline = "top";
  /**
   * Access to the container that contains
   * all text objects
   */
  model = new I();
  segments = [];
  metrics = new Pt();
  background;
  styles;
  constructor(t) {
    super(), this.view.addChild(this.model), typeof t == "string" ? (this.text = t, this.reflectUpdate()) : t && (Object.assign(this, t), this.reflectUpdate());
  }
  get text() {
    return this._text;
  }
  set text(t) {
    this._text = t;
  }
  get maxWidth() {
    return this._maxWidth;
  }
  set maxWidth(t) {
    this._maxWidth = t;
  }
  get textAlign() {
    return this._textAlign;
  }
  set textAlign(t) {
    this._textAlign = t, this._anchor.x = ce[t];
    const e = this.metrics.width;
    for (const i of this.metrics.lines) {
      let s = 0;
      (t == "center" || t == "justify") && (s = (e - i.width) / 2), t == "right" && (s = e - i.width);
      for (const n of i.tokens)
        this.model.children[n.index].x = s, s += n.metrics.lineWidths[0];
    }
  }
  get textBaseline() {
    return this._textBaseline;
  }
  set textBaseline(t) {
    this._textBaseline = t, this._anchor.y = he[t];
    let e = 0;
    for (const i of this.metrics.lines) {
      const s = i.height;
      for (const n of i.tokens) {
        let r = 0;
        t == "middle" && (r = (s - n.metrics.lineHeight) / 2), t == "bottom" && (r = s - n.metrics.lineHeight), this.model.children[n.index].y = e + r;
      }
      e += s;
    }
  }
  copy() {
    const t = ue.fromJSON(JSON.parse(JSON.stringify(this)));
    return t.filters = this.filters, t.font = this.font, t;
  }
  createRenderSplits(t = []) {
    const e = this.transformedText ?? "", i = [
      {
        index: void 0,
        tokens: gt(e.substring(0, t?.at(0)?.start))
      }
    ];
    for (let s = 0; s < t.length; s++)
      i.push({
        index: t[s].index,
        tokens: gt(e.substring(t[s].start, t[s].stop))
      }), !((t[s].stop ?? e.length) >= e.length) && i.push({
        index: void 0,
        tokens: gt(e.substring(t[s].stop, t.at(s + 1)?.start))
      });
    return i.filter((s) => s.tokens.join("").trim().length);
  }
  createTextMetrics(t, e) {
    const i = new Pt();
    for (const s of t) {
      const n = s.index != null ? e[s.index] : this.style;
      for (let r = 0; r < s.tokens.length; r++) {
        const a = hs(Ue.measureText(s.tokens[r], n)), l = (i.lines.at(-1)?.width ?? 0) + a.lineWidths[0], c = this.maxWidth ?? Number.POSITIVE_INFINITY, u = s.tokens.at(r - 1)?.match(/(\n|\\n).$/gim);
        (l > c || u || !i.lines.length) && i.lines.push(new ds()), this.model.addChild(
          new q({
            text: s.tokens[r],
            style: n,
            resolution: R,
            scale: R
          })
        ), i.lines.at(-1)?.tokens.push({
          metrics: a,
          index: this.model.children.length - 1
        });
      }
    }
    return i;
  }
  createTextStyles() {
    return this.styles?.map((t) => {
      const e = this.style.clone();
      return e.fill = t.fillStyle ?? this.style.fill, e.fontSize = t.fontSize ?? this.style.fontSize, e.stroke = t.stroke ?? this.style.stroke, e.fontFamily = t.font?.name ?? this.style.fontFamily, e;
    }) ?? [];
  }
  drawBackground() {
    if (this.view.children.length > 1 && this.view.removeChildAt(0), !this.background) return;
    const t = this.model.width, e = this.model.height, i = this.background.padding?.x ?? 40, s = this.background.padding?.y ?? 10, n = new Ft();
    n.roundRect(
      0 - i / 2,
      2 - s / 2,
      t + i,
      e + s,
      this.background.borderRadius ?? 20
    ), n.fill(this.background.fill ?? "#000000"), n.alpha = this.background.alpha ?? 1, this.view.addChildAt(n, 0);
  }
  reflectUpdate() {
    if (!this.transformedText) return;
    this.model.removeChildren();
    const t = this.createRenderSplits(this.segments), e = this.createTextStyles();
    this.metrics = this.createTextMetrics(t, e), this.textAlign = this.textAlign, this.textBaseline = this.textBaseline;
    const i = this.view.width, s = this.view.height, n = (this.style.dropShadow?.distance ?? 0) * R;
    this.view.pivot = {
      x: (i - n) * this._anchor.x,
      y: (s - n) * this._anchor.y
    }, this.drawBackground();
  }
};
J([
  h()
], O.prototype, "background", 2);
J([
  h(us)
], O.prototype, "styles", 2);
J([
  h()
], O.prototype, "text", 1);
J([
  h()
], O.prototype, "maxWidth", 1);
J([
  h()
], O.prototype, "textAlign", 1);
J([
  h()
], O.prototype, "textBaseline", 1);
let H = O;
const fe = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO3ZhciBtPSh0PT4odFt0LkFWTUVESUFfVFlQRV9VTktOT1dOPS0xXT0iQVZNRURJQV9UWVBFX1VOS05PV04iLHRbdC5BVk1FRElBX1RZUEVfVklERU89MF09IkFWTUVESUFfVFlQRV9WSURFTyIsdFt0LkFWTUVESUFfVFlQRV9BVURJTz0xXT0iQVZNRURJQV9UWVBFX0FVRElPIix0W3QuQVZNRURJQV9UWVBFX0RBVEE9Ml09IkFWTUVESUFfVFlQRV9EQVRBIix0W3QuQVZNRURJQV9UWVBFX1NVQlRJVExFPTNdPSJBVk1FRElBX1RZUEVfU1VCVElUTEUiLHRbdC5BVk1FRElBX1RZUEVfQVRUQUNITUVOVD00XT0iQVZNRURJQV9UWVBFX0FUVEFDSE1FTlQiLHRbdC5BVk1FRElBX1RZUEVfTkI9NV09IkFWTUVESUFfVFlQRV9OQiIsdCkpKG18fHt9KSxvPSh0PT4odC5GRm1wZWdXb3JrZXJMb2FkZWQ9IkZGbXBlZ1dvcmtlckxvYWRlZCIsdC5XQVNNUnVudGltZUluaXRpYWxpemVkPSJXQVNNUnVudGltZUluaXRpYWxpemVkIix0LkxvYWRXQVNNPSJMb2FkV0FTTSIsdC5HZXRBVlBhY2tldD0iR2V0QVZQYWNrZXQiLHQuR2V0QVZQYWNrZXRzPSJHZXRBVlBhY2tldHMiLHQuR2V0QVZTdHJlYW09IkdldEFWU3RyZWFtIix0LkdldEFWU3RyZWFtcz0iR2V0QVZTdHJlYW1zIix0LlJlYWRBVlBhY2tldD0iUmVhZEFWUGFja2V0Iix0LkFWUGFja2V0U3RyZWFtPSJBVlBhY2tldFN0cmVhbSIsdC5SZWFkTmV4dEFWUGFja2V0PSJSZWFkTmV4dEFWUGFja2V0Iix0LlN0b3BSZWFkQVZQYWNrZXQ9IlN0b3BSZWFkQVZQYWNrZXQiLHQpKShvfHx7fSk7Y29uc3QgQT0iS0daMWJtTjBhVzl1S0NsN0luVnpaU0J6ZEhKcFkzUWlPMnhsZENCbU8zTmxiR1l1Y0c5emRFMWxjM05oWjJVb2UzUjVjR1U2SWtaR2JYQmxaMWR2Y210bGNreHZZV1JsWkNKOUtTeHpaV3htTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSW0xbGMzTmhaMlVpTEdGemVXNWpJR1oxYm1OMGFXOXVLR3dwZTJOdmJuTjBlM1I1Y0dVNmRDeGtZWFJoT21NOWUzMHNiWE5uU1dRNmIzMDliQzVrWVhSaE8zUnllWHRwWmloMFBUMDlJa3h2WVdSWFFWTk5JaWw3WTI5dWMzUjdkMkZ6YlV4dllXUmxjbEJoZEdnNlpYMDlZM3g4ZTMwN1pqMWhkMkZwZENoaGQyRnBkQ0JwYlhCdmNuUW9aU2twTG1SbFptRjFiSFFvS1gxbGJITmxJR2xtS0hROVBUMGlSMlYwUVZaVGRISmxZVzBpS1h0amIyNXpkSHRtYVd4bE9tVXNjM1J5WldGdFZIbHdaVHB6TEhOMGNtVmhiVWx1WkdWNE9tRjlQV01zY2oxbUxtZGxkRUZXVTNSeVpXRnRLR1VzY3l4aEtUdHpaV3htTG5CdmMzUk5aWE56WVdkbEtIdDBlWEJsT25Rc2JYTm5TV1E2Ynl4eVpYTjFiSFE2Y24wc1czSXVZMjlrWldOd1lYSXVaWGgwY21Ga1lYUmhMbUoxWm1abGNsMHBmV1ZzYzJVZ2FXWW9kRDA5UFNKSFpYUkJWbE4wY21WaGJYTWlLWHRqYjI1emRIdG1hV3hsT21WOVBXTXNjejFtTG1kbGRFRldVM1J5WldGdGN5aGxLVHR6Wld4bUxuQnZjM1JOWlhOellXZGxLSHQwZVhCbE9uUXNiWE5uU1dRNmJ5eHlaWE4xYkhRNmMzMHNjeTV0WVhBb1lUMCtZUzVqYjJSbFkzQmhjaTVsZUhSeVlXUmhkR0V1WW5WbVptVnlLU2w5Wld4elpTQnBaaWgwUFQwOUlrZGxkRUZXVUdGamEyVjBJaWw3WTI5dWMzUjdabWxzWlRwbExIUnBiV1U2Y3l4emRISmxZVzFVZVhCbE9tRXNjM1J5WldGdFNXNWtaWGc2Y24wOVl5eHVQV1l1WjJWMFFWWlFZV05yWlhRb1pTeHpMR0VzY2lrN2MyVnNaaTV3YjNOMFRXVnpjMkZuWlNoN2RIbHdaVHAwTEcxelowbGtPbThzY21WemRXeDBPbTU5TEZ0dUxtUmhkR0V1WW5WbVptVnlYU2w5Wld4elpTQnBaaWgwUFQwOUlrZGxkRUZXVUdGamEyVjBjeUlwZTJOdmJuTjBlMlpwYkdVNlpTeDBhVzFsT25OOVBXTXNZVDFtTG1kbGRFRldVR0ZqYTJWMGN5aGxMSE1wTzNObGJHWXVjRzl6ZEUxbGMzTmhaMlVvZTNSNWNHVTZkQ3h0YzJkSlpEcHZMSEpsYzNWc2REcGhmU3hoTG0xaGNDaHlQVDV5TG1SaGRHRXVZblZtWm1WeUtTbDlaV3h6WlNCcFppaDBQVDA5SWxKbFlXUkJWbEJoWTJ0bGRDSXBlMk52Ym5OMGUyWnBiR1U2WlN4emRHRnlkRHB6TEdWdVpEcGhMSE4wY21WaGJWUjVjR1U2Y2l4emRISmxZVzFKYm1SbGVEcHVmVDFqTEdROVppNXlaV0ZrUVZaUVlXTnJaWFFvYnl4bExITXNZU3h5TEc0cE8zTmxiR1l1Y0c5emRFMWxjM05oWjJVb2UzUjVjR1U2ZEN4dGMyZEpaRHB2TEhKbGMzVnNkRHBrZlNsOWZXTmhkR05vS0dVcGUzTmxiR1l1Y0c5emRFMWxjM05oWjJVb2UzUjVjR1U2ZEN4dGMyZEpaRHB2TEdWeWNrMXpaenBsSUdsdWMzUmhibU5sYjJZZ1JYSnliM0kvWlM1dFpYTnpZV2RsT2lKVmJtdHViM2R1SUVWeWNtOXlJbjBwZlgwcGZTa29LVHNLIixnPXQ9PlVpbnQ4QXJyYXkuZnJvbShhdG9iKHQpLGU9PmUuY2hhckNvZGVBdCgwKSksVj10eXBlb2Ygc2VsZjwidSImJnNlbGYuQmxvYiYmbmV3IEJsb2IoW2coQSldLHt0eXBlOiJ0ZXh0L2phdmFzY3JpcHQ7Y2hhcnNldD11dGYtOCJ9KTtmdW5jdGlvbiBFKHQpe2xldCBlO3RyeXtpZihlPVYmJihzZWxmLlVSTHx8c2VsZi53ZWJraXRVUkwpLmNyZWF0ZU9iamVjdFVSTChWKSwhZSl0aHJvdyIiO2NvbnN0IHM9bmV3IFdvcmtlcihlLHtuYW1lOnQ/Lm5hbWV9KTtyZXR1cm4gcy5hZGRFdmVudExpc3RlbmVyKCJlcnJvciIsKCk9Pnsoc2VsZi5VUkx8fHNlbGYud2Via2l0VVJMKS5yZXZva2VPYmplY3RVUkwoZSl9KSxzfWNhdGNoe3JldHVybiBuZXcgV29ya2VyKCJkYXRhOnRleHQvamF2YXNjcmlwdDtiYXNlNjQsIitBLHtuYW1lOnQ/Lm5hbWV9KX1maW5hbGx5e2UmJihzZWxmLlVSTHx8c2VsZi53ZWJraXRVUkwpLnJldm9rZU9iamVjdFVSTChlKX19Y29uc3QgdT0xZTY7Y2xhc3MgcHtmZm1wZWdXb3JrZXI7ZmZtcGVnV29ya2VyTG9hZFN0YXR1czttc2dJZDtmaWxlO2NvbnN0cnVjdG9yKGUpe3RoaXMuZmZtcGVnV29ya2VyPW5ldyBFLHRoaXMuZmZtcGVnV29ya2VyTG9hZFN0YXR1cz1uZXcgUHJvbWlzZSgocyxhKT0+e3RoaXMuZmZtcGVnV29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLGk9Pntjb25zdHt0eXBlOnIsZXJyTXNnOmR9PWkuZGF0YTtyPT09by5GRm1wZWdXb3JrZXJMb2FkZWQmJnRoaXMucG9zdChvLkxvYWRXQVNNLHt3YXNtTG9hZGVyUGF0aDplLndhc21Mb2FkZXJQYXRofSkscj09PW8uV0FTTVJ1bnRpbWVJbml0aWFsaXplZCYmcyghMCkscj09PW8uTG9hZFdBU00mJmQmJmEoZCl9KX0pLHRoaXMubXNnSWQ9MH1wb3N0KGUscyxhKXt0aGlzLmZmbXBlZ1dvcmtlci5wb3N0TWVzc2FnZSh7dHlwZTplLG1zZ0lkOmE/P3RoaXMubXNnSWQrKyxkYXRhOnN9KX1hc3luYyBsb2FkKGUpe2NvbnN0IHM9YXdhaXQgdGhpcy5mZm1wZWdXb3JrZXJMb2FkU3RhdHVzO3JldHVybiB0aGlzLmZpbGU9ZSxzfWRlc3Ryb3koKXt0aGlzLmZpbGU9dm9pZCAwLHRoaXMuZmZtcGVnV29ya2VyLnRlcm1pbmF0ZSgpfWdldEFWU3RyZWFtKGU9bS5BVk1FRElBX1RZUEVfVklERU8scz0tMSl7cmV0dXJuIG5ldyBQcm9taXNlKChhLGkpPT57aWYoIXRoaXMuZmlsZSl7aSgiZmlsZSBpcyBub3QgbG9hZGVkIik7cmV0dXJufWNvbnN0IHI9dGhpcy5tc2dJZCxkPSh7ZGF0YTpufSk9PntuLnR5cGU9PT1vLkdldEFWU3RyZWFtJiZuLm1zZ0lkPT09ciYmKG4uZXJyTXNnP2kobi5lcnJNc2cpOmEobi5yZXN1bHQpLHRoaXMuZmZtcGVnV29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLGQpKX07dGhpcy5mZm1wZWdXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsZCksdGhpcy5wb3N0KG8uR2V0QVZTdHJlYW0se2ZpbGU6dGhpcy5maWxlLHN0cmVhbVR5cGU6ZSxzdHJlYW1JbmRleDpzfSl9KX1nZXRBVlN0cmVhbXMoKXtyZXR1cm4gbmV3IFByb21pc2UoKGUscyk9PntpZighdGhpcy5maWxlKXtzKCJmaWxlIGlzIG5vdCBsb2FkZWQiKTtyZXR1cm59Y29uc3QgYT10aGlzLm1zZ0lkLGk9KHtkYXRhOnJ9KT0+e3IudHlwZT09PW8uR2V0QVZTdHJlYW1zJiZyLm1zZ0lkPT09YSYmKHIuZXJyTXNnP3Moci5lcnJNc2cpOmUoci5yZXN1bHQpLHRoaXMuZmZtcGVnV29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLGkpKX07dGhpcy5mZm1wZWdXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsaSksdGhpcy5wb3N0KG8uR2V0QVZTdHJlYW1zLHtmaWxlOnRoaXMuZmlsZX0pfSl9Z2V0QVZQYWNrZXQoZSxzPW0uQVZNRURJQV9UWVBFX1ZJREVPLGE9LTEpe3JldHVybiBuZXcgUHJvbWlzZSgoaSxyKT0+e2lmKCF0aGlzLmZpbGUpe3IoImZpbGUgaXMgbm90IGxvYWRlZCIpO3JldHVybn1jb25zdCBkPXRoaXMubXNnSWQsbj1oPT57Y29uc3QgbD1oLmRhdGE7bC50eXBlPT09by5HZXRBVlBhY2tldCYmbC5tc2dJZD09PWQmJihsLmVyck1zZz9yKGwuZXJyTXNnKTppKGwucmVzdWx0KSx0aGlzLmZmbXBlZ1dvcmtlci5yZW1vdmVFdmVudExpc3RlbmVyKCJtZXNzYWdlIixuKSl9O3RoaXMuZmZtcGVnV29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLG4pLHRoaXMucG9zdChvLkdldEFWUGFja2V0LHtmaWxlOnRoaXMuZmlsZSx0aW1lOmUsc3RyZWFtVHlwZTpzLHN0cmVhbUluZGV4OmF9KX0pfWdldEFWUGFja2V0cyhlKXtyZXR1cm4gbmV3IFByb21pc2UoKHMsYSk9PntpZighdGhpcy5maWxlKXthKCJmaWxlIGlzIG5vdCBsb2FkZWQiKTtyZXR1cm59Y29uc3QgaT10aGlzLm1zZ0lkLHI9ZD0+e2NvbnN0IG49ZC5kYXRhO24udHlwZT09PW8uR2V0QVZQYWNrZXRzJiZuLm1zZ0lkPT09aSYmKG4uZXJyTXNnP2Eobi5lcnJNc2cpOnMobi5yZXN1bHQpLHRoaXMuZmZtcGVnV29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLHIpKX07dGhpcy5mZm1wZWdXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsciksdGhpcy5wb3N0KG8uR2V0QVZQYWNrZXRzLHtmaWxlOnRoaXMuZmlsZSx0aW1lOmV9KX0pfXJlYWRBVlBhY2tldChlPTAscz0wLGE9bS5BVk1FRElBX1RZUEVfVklERU8saT0tMSl7Y29uc3Qgcj1uZXcgQ291bnRRdWV1aW5nU3RyYXRlZ3koe2hpZ2hXYXRlck1hcms6MX0pLGQ9dGhpcy5tc2dJZDtsZXQgbj0wO3JldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe3N0YXJ0Omg9PntpZighdGhpcy5maWxlKXtoLmVycm9yKCJmaWxlIGlzIG5vdCBsb2FkZWQiKTtyZXR1cm59Y29uc3QgbD1mPT57Y29uc3QgYz1mLmRhdGE7Yy50eXBlPT09by5SZWFkQVZQYWNrZXQmJmMubXNnSWQ9PT1kJiZjLmVyck1zZyYmKGguZXJyb3IoYy5lcnJNc2cpLHRoaXMuZmZtcGVnV29ya2VyLnJlbW92ZUV2ZW50TGlzdGVuZXIoIm1lc3NhZ2UiLGwpKSxjLnR5cGU9PT1vLkFWUGFja2V0U3RyZWFtJiZjLm1zZ0lkPT09ZCYmKGMucmVzdWx0P2guZW5xdWV1ZShjLnJlc3VsdCk6aC5jbG9zZSgpKX07dGhpcy5mZm1wZWdXb3JrZXIuYWRkRXZlbnRMaXN0ZW5lcigibWVzc2FnZSIsbCksdGhpcy5wb3N0KG8uUmVhZEFWUGFja2V0LHtmaWxlOnRoaXMuZmlsZSxzdGFydDplLGVuZDpzLHN0cmVhbVR5cGU6YSxzdHJlYW1JbmRleDppfSl9LHB1bGw6KCk9PntuPjAmJnRoaXMucG9zdChvLlJlYWROZXh0QVZQYWNrZXQsdm9pZCAwLGQpLG4rK30sY2FuY2VsOigpPT57dGhpcy5wb3N0KG8uU3RvcFJlYWRBVlBhY2tldCx2b2lkIDAsZCl9fSxyKX1nZXRWaWRlb1N0cmVhbShlKXtyZXR1cm4gdGhpcy5nZXRBVlN0cmVhbShtLkFWTUVESUFfVFlQRV9WSURFTyxlKX1nZXRBdWRpb1N0cmVhbShlKXtyZXR1cm4gdGhpcy5nZXRBVlN0cmVhbShtLkFWTUVESUFfVFlQRV9BVURJTyxlKX1zZWVrVmlkZW9QYWNrZXQoZSl7cmV0dXJuIHRoaXMuZ2V0QVZQYWNrZXQoZSxtLkFWTUVESUFfVFlQRV9WSURFTyl9c2Vla0F1ZGlvUGFja2V0KGUpe3JldHVybiB0aGlzLmdldEFWUGFja2V0KGUsbS5BVk1FRElBX1RZUEVfQVVESU8pfXJlYWRWaWRlb1BhY2tldChlLHMpe3JldHVybiB0aGlzLnJlYWRBVlBhY2tldChlLHMsbS5BVk1FRElBX1RZUEVfVklERU8pfXJlYWRBdWRpb1BhY2tldChlLHMpe3JldHVybiB0aGlzLnJlYWRBVlBhY2tldChlLHMsbS5BVk1FRElBX1RZUEVfQVVESU8pfWdlblZpZGVvRGVjb2RlckNvbmZpZyhlKXtyZXR1cm57Y29kZWM6ZS5jb2RlY3Bhci5jb2RlY19zdHJpbmcsY29kZWRXaWR0aDplLmNvZGVjcGFyLndpZHRoLGNvZGVkSGVpZ2h0OmUuY29kZWNwYXIuaGVpZ2h0LGRlc2NyaXB0aW9uOmUuY29kZWNwYXIuZXh0cmFkYXRhPy5sZW5ndGg+MD9lLmNvZGVjcGFyLmV4dHJhZGF0YTp2b2lkIDB9fWdlbkVuY29kZWRWaWRlb0NodW5rKGUpe3JldHVybiBuZXcgRW5jb2RlZFZpZGVvQ2h1bmsoe3R5cGU6ZS5rZXlmcmFtZT09PTE/ImtleSI6ImRlbHRhIix0aW1lc3RhbXA6ZS50aW1lc3RhbXAqdSxkdXJhdGlvbjplLmR1cmF0aW9uKnUsZGF0YTplLmRhdGF9KX1nZW5BdWRpb0RlY29kZXJDb25maWcoZSl7cmV0dXJue2NvZGVjOmUuY29kZWNwYXIuY29kZWNfc3RyaW5nfHwiIixzYW1wbGVSYXRlOmUuY29kZWNwYXIuc2FtcGxlX3JhdGUsbnVtYmVyT2ZDaGFubmVsczplLmNvZGVjcGFyLmNoYW5uZWxzLGRlc2NyaXB0aW9uOmUuY29kZWNwYXIuZXh0cmFkYXRhPy5sZW5ndGg+MD9lLmNvZGVjcGFyLmV4dHJhZGF0YTp2b2lkIDB9fWdlbkVuY29kZWRBdWRpb0NodW5rKGUpe3JldHVybiBuZXcgRW5jb2RlZEF1ZGlvQ2h1bmsoe3R5cGU6ZS5rZXlmcmFtZT09PTE/ImtleSI6ImRlbHRhIix0aW1lc3RhbXA6ZS50aW1lc3RhbXAqdSxkdXJhdGlvbjplLmR1cmF0aW9uKnUsZGF0YTplLmRhdGF9KX1hc3luYyBnZXRWaWRlb0RlY29kZXJDb25maWcoKXtjb25zdCBlPWF3YWl0IHRoaXMuZ2V0VmlkZW9TdHJlYW0oKTtyZXR1cm4gdGhpcy5nZW5WaWRlb0RlY29kZXJDb25maWcoZSl9YXN5bmMgc2Vla0VuY29kZWRWaWRlb0NodW5rKGUpe2NvbnN0IHM9YXdhaXQgdGhpcy5zZWVrVmlkZW9QYWNrZXQoZSk7cmV0dXJuIHRoaXMuZ2VuRW5jb2RlZFZpZGVvQ2h1bmsocyl9YXN5bmMgZ2V0QXVkaW9EZWNvZGVyQ29uZmlnKCl7Y29uc3QgZT1hd2FpdCB0aGlzLmdldEF1ZGlvU3RyZWFtKCk7cmV0dXJuIHRoaXMuZ2VuQXVkaW9EZWNvZGVyQ29uZmlnKGUpfWFzeW5jIHNlZWtFbmNvZGVkQXVkaW9DaHVuayhlKXtjb25zdCBzPWF3YWl0IHRoaXMuc2Vla0F1ZGlvUGFja2V0KGUpO3JldHVybiB0aGlzLmdlbkVuY29kZWRBdWRpb0NodW5rKHMpfX1jbGFzcyBre3ZpZGVvO2N1cnJlbnRGcmFtZXM9MDt0b3RhbEZyYW1lcztjdXJyZW50VGltZTtmcHM7Zmlyc3RUaW1lc3RhbXA7Y29uc3RydWN0b3IoZSxzKXt0aGlzLmN1cnJlbnRUaW1lPWVbMF0qMWU2LHRoaXMuZmlyc3RUaW1lc3RhbXA9ZVswXSoxZTYsdGhpcy50b3RhbEZyYW1lcz0oZVsxXS1lWzBdKSpzKzEsdGhpcy5mcHM9cyx0aGlzLnZpZGVvPW5ldyBWaWRlb0RlY29kZXIoe291dHB1dDp0aGlzLmhhbmRsZUZyYW1lT3V0cHV0LmJpbmQodGhpcyksZXJyb3I6dGhpcy5oYW5kbGVFcnJvci5iaW5kKHRoaXMpfSl9cG9zdEZyYW1lKGUpe3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6ImZyYW1lIixmcmFtZTplfSksdGhpcy5jdXJyZW50VGltZSs9TWF0aC5mbG9vcigxL3RoaXMuZnBzKjFlNiksdGhpcy5jdXJyZW50RnJhbWVzKz0xfWhhbmRsZUZyYW1lT3V0cHV0KGUpe2NvbnN0IHM9ZS50aW1lc3RhbXAsYT1lLmR1cmF0aW9uPz8wLGk9cythO2lmKCF0aGlzLmlzRnJhbWVJblJhbmdlKHMpKXtlLmNsb3NlKCk7cmV0dXJufWZvcig7aT50aGlzLmN1cnJlbnRUaW1lJiZ0aGlzLmN1cnJlbnRGcmFtZXM8PXRoaXMudG90YWxGcmFtZXM7KXRoaXMucG9zdEZyYW1lKGUpO2UuY2xvc2UoKX1pc0ZyYW1lSW5SYW5nZShlKXtyZXR1cm4gZT49dGhpcy5maXJzdFRpbWVzdGFtcH1oYW5kbGVFcnJvcihlKXtjb25zb2xlLmVycm9yKCJlcnJvciBpbiB3b3JrZXIiLGUpLHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6ImVycm9yIixtZXNzYWdlOmUubWVzc2FnZT8/IkFuIHVua25vd24gd29ya2VyIGVycm9yIG9jY3VycmVkIn0pLHNlbGYuY2xvc2UoKX19ZnVuY3Rpb24gSSh0KXtyZXR1cm4gYXN5bmMgZT0+e3RyeXthd2FpdCB0KGUpfWNhdGNoKHMpe3NlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6ImVycm9yIixtZXNzYWdlOnM/Lm1lc3NhZ2U/PyJBbiB1bmtvd24gd29ya2VyIGVycm9yIG9jY3VyZWQifSl9fX1mdW5jdGlvbiBXKHQpe3JldHVybiB0LmNvZGVjPT0idnAwOSImJih0LmNvZGVjPSJ2cDA5LjAwLjEwLjA4IiksdH1jb25zdCBaPTMwO2FzeW5jIGZ1bmN0aW9uIFAodCl7aWYodC5kYXRhPy50eXBlIT0iaW5pdCIpcmV0dXJuO2NvbnN0e2ZpbGU6ZSxyYW5nZTpzLGZwczphfT10LmRhdGEsaT1uZXcgcCh7d2FzbUxvYWRlclBhdGg6Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vQGRpZmZ1c2lvbnN0dWRpby9mZm1wZWctd2FzbUAxLjAuMC9kaXN0L2ZmbXBlZy5qcyJ9KTthd2FpdCBpLmxvYWQoZSk7Y29uc3Qgcj1hd2FpdCBpLmdldFZpZGVvRGVjb2RlckNvbmZpZygpO1cocik7Y29uc3QgZD1uZXcgayhzLGEpO2QudmlkZW8uY29uZmlndXJlKHIpO2NvbnN0IG49aS5yZWFkQVZQYWNrZXQoc1swXSxzWzFdKS5nZXRSZWFkZXIoKTtuLnJlYWQoKS50aGVuKGFzeW5jIGZ1bmN0aW9uIGgoe2RvbmU6bCx2YWx1ZTpmfSl7aWYobCl7YXdhaXQgZC52aWRlby5mbHVzaCgpLHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6ImRvbmUifSksc2VsZi5jbG9zZSgpO3JldHVybn1jb25zdCBjPWkuZ2VuRW5jb2RlZFZpZGVvQ2h1bmsoZik7cmV0dXJuIGQudmlkZW8uZGVjb2RlUXVldWVTaXplPlomJmF3YWl0IG5ldyBQcm9taXNlKEw9PntkLnZpZGVvLm9uZGVxdWV1ZT0oKT0+TCgpfSksYy50aW1lc3RhbXA8PXNbMV0qMWU2JiZkLnZpZGVvLmRlY29kZShjKSxuLnJlYWQoKS50aGVuKGgpfSl9c2VsZi5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIixJKFApKX0pKCk7Cg==", ms = (o) => Uint8Array.from(atob(o), (t) => t.charCodeAt(0)), Ht = typeof self < "u" && self.Blob && new Blob([ms(fe)], { type: "text/javascript;charset=utf-8" });
function gs(o) {
  let t;
  try {
    if (t = Ht && (self.URL || self.webkitURL).createObjectURL(Ht), !t) throw "";
    const e = new Worker(t, {
      name: o?.name
    });
    return e.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + fe,
      {
        name: o?.name
      }
    );
  } finally {
    t && (self.URL || self.webkitURL).revokeObjectURL(t);
  }
}
class ws {
  frames = [];
  state = "active";
  onenqueue;
  onclose;
  enqueue(t) {
    this.frames.unshift(t), this.onenqueue?.();
  }
  async dequeue() {
    if (this.frames.length == 0 && this.state == "active" && await this.waitFor(2e4), !(this.frames.length == 0 && this.state == "closed"))
      return this.frames.pop();
  }
  close() {
    this.state = "closed", this.onclose?.();
  }
  terminate() {
    for (const t of this.frames)
      t.close();
  }
  async waitFor(t) {
    await new Promise((e, i) => {
      const s = setTimeout(() => {
        i(`Promise timed out after ${t} ms`);
      }, t);
      this.onenqueue = () => {
        clearTimeout(s), e();
      }, this.onclose = () => {
        clearTimeout(s), e();
      };
    });
  }
}
function ys(o, t, e) {
  const i = e.value;
  return e.value = function(...s) {
    return this.track?.composition?.rendering && this.sprite.texture.source.uid != this.textrues.canvas.source.uid && (this.sprite.texture = this.textrues.canvas), !this.track?.composition?.rendering && this.sprite.texture.source.uid != this.textrues.html5.source.uid && (this.sprite.texture = this.textrues.html5), i.apply(this, s);
  }, e;
}
var bs = Object.defineProperty, xs = Object.getOwnPropertyDescriptor, Zs = (o, t, e, i) => {
  for (var s = xs(t, e), n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && bs(t, e, s), s;
};
const pe = class me extends rt(ot) {
  source = new Vt();
  type = "video";
  worker;
  buffer;
  canvas = document.createElement("canvas");
  context = this.canvas.getContext("2d");
  /**
   * Html5 video element access
   */
  element = document.createElement("video");
  /**
   * Html5 and canvas video textures
   */
  textrues = {
    html5: st.from(this.element),
    canvas: st.from(this.canvas)
  };
  /**
   * Access to the sprite containing the video
   */
  sprite = new Y();
  constructor(t, e = {}) {
    super(), this.element.controls = !1, this.element.playsInline = !0, this.element.style.display = "hidden", this.element.crossOrigin = "anonymous", this.textrues.html5.source.autoPlay = !1, this.textrues.html5.source.loop = !1, this.sprite.texture = this.textrues.html5, this.view.addChild(this.sprite), t instanceof Vt && (this.source = t), t instanceof File && this.source.from(t), this.element.addEventListener("play", () => {
      this.playing = !0;
    }), this.element.addEventListener("pause", () => {
      this.playing = !1;
    }), Object.assign(this, e);
  }
  async init() {
    const t = await this.source.createObjectURL();
    this.element.setAttribute("src", t), await new Promise((e, i) => {
      this.element.oncanplay = () => {
        this.duration.seconds = this.element.duration, this.state = "READY", e();
      }, this.element.onerror = () => {
        this.state = "ERROR";
        const s = new v({
          code: "sourceNotProcessable",
          message: "An error occurred while processing the input medium."
        });
        i(this.element.error ?? s);
      };
    });
  }
  async connect(t) {
    super.connect(t);
    const e = t.composition?.frame ?? 0;
    await this.seek(d.fromFrames(e));
  }
  enter() {
    super.enter(), this.track?.composition?.rendering && this.buffer?.state != "active" && this.decodeVideo();
  }
  update(t) {
    if (this.track?.composition?.playing && !this.playing)
      this.element.play();
    else if (!this.track?.composition?.playing && this.playing)
      this.element.pause();
    else if (this.track?.composition?.rendering)
      return this.nextFrame();
  }
  exit() {
    this.playing && this.element.pause(), this.filters && this.view.filters && (this.view.filters = null);
  }
  copy() {
    const t = me.fromJSON(JSON.parse(JSON.stringify(this)));
    return t.filters = this.filters, t.source = this.source, t;
  }
  async decodeVideo() {
    return this.buffer = new ws(), this.worker = new gs(), this.worker.addEventListener("message", (t) => {
      t.data.type == "frame" ? this.buffer?.enqueue(t.data.frame) : t.data.type == "error" ? this.cancelDecoding() : t.data.type == "done" && this.buffer?.close();
    }), this.worker.postMessage({
      type: "init",
      file: await this.source.getFile(),
      range: this.demuxRange,
      fps: this.track?.composition?.fps ?? U
    }), this.buffer;
  }
  async nextFrame() {
    if (!this.buffer) return;
    const t = await this.buffer.dequeue();
    t && (this.canvas.width = t.displayWidth, this.canvas.height = t.displayHeight, this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.drawImage(t, 0, 0), this.textrues.canvas.source.update(), t.close());
  }
  get demuxRange() {
    const t = this.track?.composition;
    let e;
    this.start.millis < 0 ? e = Math.abs(this.offset.seconds) : e = this.range[0].seconds;
    let i;
    return t && this.stop.millis > t.duration.millis ? i = t.duration.subtract(this.offset).seconds : i = this.range[1].seconds, [e, i];
  }
  /**
   * Cancel decoding
   */
  cancelDecoding() {
    this.worker?.terminate(), this.worker = void 0, this.buffer?.terminate(), this.buffer = void 0;
  }
};
Zs([
  at,
  ys
], pe.prototype, "update");
let vt = pe;
class it extends ot {
  type = "audio";
  source = new B();
  /**
   * Access to the HTML5 audio element
   */
  element = new Audio();
  constructor(t, e = {}) {
    super(), t instanceof B && (this.source = t), t instanceof File && this.source.from(t), this.element.addEventListener("play", () => {
      this.playing = !0;
    }), this.element.addEventListener("pause", () => {
      this.playing = !1;
    }), Object.assign(this, e);
  }
  async init() {
    const t = await this.source.createObjectURL();
    this.element.setAttribute("src", t), this.element.load(), await new Promise((e, i) => {
      this.element.oncanplay = () => {
        this.duration.seconds = this.element.duration, this.state = "READY", e();
      }, this.element.onerror = () => {
        this.state = "ERROR";
        const s = new v({
          code: "sourceNotProcessable",
          message: "An error occurred while processing the input medium."
        });
        i(this.element.error ?? s);
      };
    });
  }
  update() {
    if (this.track?.composition?.rendering)
      return this.exit();
    this.track?.composition?.playing && !this.playing ? this.element.play() : !this.track?.composition?.playing && this.playing && this.element.pause();
  }
  exit() {
    this.playing && this.element.pause();
  }
  copy() {
    const t = it.fromJSON(JSON.parse(JSON.stringify(this)));
    return t.source = this.source, t;
  }
}
const Vs = {
  IMAGE: {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/svg+xml": "svg"
  },
  VIDEO: {
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/quicktime": "mov"
    // 'video/x-msvideo': 'avi',
    // 'video/x-matroska': 'mkv',
  },
  AUDIO: {
    "audio/mp3": "mp3",
    "audio/mpeg": "mp3",
    "audio/aac": "aac",
    "audio/wav": "wav",
    "audio/x-wav": "wav"
  },
  DOCUMENT: {
    "text/html": "html"
  },
  get MIXED() {
    return {
      ...this.IMAGE,
      ...this.VIDEO,
      ...this.AUDIO,
      ...this.DOCUMENT
    };
  }
};
function Wt(o) {
  if (!Object.keys(Vs.MIXED).includes(o ?? ""))
    throw new g({
      message: `${o} is not an accepted mime type`,
      code: "invalid_mimetype"
    });
  return o;
}
var Rs = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, Ws = (o, t, e, i) => {
  for (var s = vs(t, e), n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Rs(t, e, s), s;
};
const ge = class we extends rt(_) {
  type = "html";
  source = new xt();
  /**
   * Access to the html document that
   * will be rendered to the canvas
   */
  element = new Image();
  canvas = document.createElement("canvas");
  context = this.canvas.getContext("2d");
  /**
   * Access to the sprite containing the canvas
   */
  sprite = new Y();
  constructor(t, e = {}) {
    super(), this.view.addChild(this.sprite), Object.assign(this, e), t instanceof xt && (this.source = t), t instanceof File && this.source.from(t), this.element.addEventListener("load", () => {
      const i = this.source.document?.body?.scrollWidth, s = this.source.document?.body?.scrollHeight;
      !i || !s || (this.canvas.width = i, this.canvas.height = s, this.context.imageSmoothingEnabled = !1, this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.drawImage(this.element, 0, 0), this.sprite.texture = st.from(this.canvas, !0), this.trigger("load", void 0));
    }), this.element.addEventListener("error", (i) => {
      console.error(i), this.state = "ERROR", this.trigger("error", new v({
        code: "sourceNotProcessable",
        message: "An error occurred while processing the input medium."
      })), this.track && this.detach();
    }), this.on("update", async () => {
      this.source.update(), this.element.setAttribute("src", await this.source.createObjectURL());
    });
  }
  async init() {
    this.element.setAttribute("src", await this.source.createObjectURL()), await new Promise((t, e) => {
      this.element.onload = () => {
        const i = this.source.document?.body?.scrollWidth, s = this.source.document?.body?.scrollHeight;
        if (!i || !s)
          return e(new v({
            code: "sourceNotProcessable",
            message: "Cannot display source with height or width at 0"
          }));
        this.state = "READY", t();
      }, this.element.onerror = (i) => {
        console.error(i), e(new v({
          code: "sourceNotProcessable",
          message: "An error occurred while processing the input medium."
        }));
      };
    });
  }
  update(t) {
  }
  copy() {
    const t = we.fromJSON(JSON.parse(JSON.stringify(this)));
    return t.filters = this.filters, t.source = this.source, t;
  }
};
Ws([
  at
], ge.prototype, "update");
let At = ge;
class ct extends Ft {
  constructor(t) {
    super(), this.position = t.position ?? { x: 0, y: 0 };
  }
}
class xi extends ct {
  _radius;
  constructor(t) {
    super(t), this._radius = t.radius, this.circle(this.position.x, this.position.y, this._radius), this.fill({ color: "#FFF" });
  }
}
class Zi extends ct {
  _radius;
  constructor(t) {
    super(t), this._radius = t.radius, this.ellipse(
      this.position.x,
      this.position.y,
      this._radius.x,
      this._radius.y
    ), this.fill({ color: "#FFF" });
  }
}
class Vi extends ct {
  _rectangleWidth;
  _rectangleHeight;
  constructor(t) {
    super(t), this._rectangleWidth = t.rectangleWidth, this._rectangleHeight = t.rectangleHeight, this.rect(this.position.x, this.position.y, this._rectangleWidth, this._rectangleHeight), this.fill({ color: "#FFF" });
  }
}
class Ri extends Ft {
  _rectangleWidth;
  _rectangleHeight;
  _borderRadius;
  constructor(t) {
    super(t), this._rectangleWidth = t.rectangleWidth, this._rectangleHeight = t.rectangleHeight, this._borderRadius = t.borderRadius, this.roundRect(this.position.x, this.position.y, this._rectangleWidth, this._rectangleHeight, this._borderRadius), this.fill({ color: "#FFF" });
  }
}
class vi extends ct {
  _numberOfPoints;
  _radius;
  _innerRadius;
  constructor(t) {
    super(t), this._numberOfPoints = t.numberOfPoints, this._radius = t.radius, this._innerRadius = t.innerRadius, this.star(this.position.x, this.position.y, this._numberOfPoints, this._radius, this._innerRadius, this.rotation), this.fill({ color: "#FFF" });
  }
}
const ye = ["DEFAULT", "STACK"];
class Dt {
  mode = ye[0];
  pauseAlignmet = !1;
  add(t, e) {
    let i = !0;
    for (let s = 0; s < e.clips.length && (i = $t(t, e.clips[s]), !!i); s++)
      Kt(t, e.clips[s]);
    i && (e.clips.push(t), e.clips.sort(Qt));
  }
  update(t, e) {
    if (!this.pauseAlignmet) {
      e.clips.sort(Qt);
      for (let i = 0; i < e.clips.length; i++)
        if (t.id != e.clips[i].id) {
          if (!$t(t, e.clips[i]))
            break;
          Kt(t, e.clips[i]);
        }
    }
  }
  offset(t, e) {
    this.pauseAlignmet = !0;
    for (const i of e.clips)
      i.offsetBy(t);
    this.pauseAlignmet = !1;
  }
}
class Ss {
  mode = ye[1];
  add(t, e, i = void 0) {
    let s = -1;
    (i != null && i > 0 || i == null) && (s = e.clips.at((i ?? 0) - 1)?.stop.millis ?? -1), t.offsetBy(new d(s - t.start.millis + 1)), i == null ? e.clips.push(t) : (e.clips.splice(i, 0, t), e.clips.slice(i + 1).forEach((n) => {
      n.offsetBy(t.stop.subtract(t.start));
    }));
  }
  update(t, e) {
    let i = 0;
    for (const s of e.clips) {
      if (s.start.millis != i) {
        const n = i - s.start.millis;
        s.offsetBy(new d(n));
      }
      i = s.stop.millis + 1;
    }
  }
  offset() {
  }
}
function Qt(o, t) {
  return o.start.millis - t.start.millis;
}
function Kt(o, t) {
  o.start.millis >= t.start.millis && o.start.millis <= t.stop.millis && (o.start = t.stop.copy().addMillis(1)), o.stop.millis >= t.start.millis && o.stop.millis <= t.stop.millis && (o.stop = t.start.copy().addMillis(-1));
}
function $t(o, t) {
  if (o.start.millis >= t.start.millis && o.stop.millis <= t.stop.millis) {
    const e = t.track?.composition?.tracks.find((i) => i.type == o.type && !i.clips.some((s) => o.id != s.id && o.start.millis >= s.start.millis && o.stop.millis <= s.stop.millis));
    return e ? (e.add(o.detach()), !1) : (t.track?.composition?.createTrack(o.type)?.add(o.detach()), !1);
  }
  return !0;
}
class L extends k(x) {
  _disabled = !1;
  view = new I();
  /**
   * The clips to be displayed
   */
  clips = [];
  /**
   * Pointer to the expected track
   */
  pointer = 0;
  /**
   * Reference to the composition
   */
  composition;
  /**
   * Id that can be used to search by kind
   */
  type = "base";
  /**
   * Controls how the clips should be inserted and updated
   */
  strategy = new Dt();
  /**
   * Controls the visability of the track
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(t) {
    t && this.clipRef && yt(this.clipRef) && (this.view.removeChild(this.clipRef.view), this.clipRef?.exit()), this._disabled = t, this.trigger("update", void 0);
  }
  /**
   * Connect the track with the composition
   */
  connect(t) {
    this.composition = t;
  }
  /**
   * Applies the stack property
   */
  stacked(t = !0) {
    return t ? (this.strategy = new Ss(), this.strategy.update(new _(), this)) : this.strategy = new Dt(), this.trigger("update", void 0), this;
  }
  /**
   * Change the layer of the track
   */
  layer(t) {
    const e = this.composition?.tracks ?? [], i = e.findIndex((r) => r.id == this.id), s = e.length - 1;
    if (i == -1) return this;
    let n = 0;
    return t == "bottom" ? n = s : t == "top" || t < 0 ? n = 0 : t > s ? n = s : n = t, Ne(e, i, n), this.composition?.stage.setChildIndex(this.view, s - n), this.trigger("update", void 0), this;
  }
  /**
   * Seek the provided time if the track contains
   * audio or video clips
   */
  seek(t) {
  }
  /**
   * Move all clips of the track at once along the timeline
   */
  offsetBy(t) {
    return typeof t == "number" ? this.strategy.offset(d.fromFrames(t), this) : this.strategy.offset(t, this), this;
  }
  /**
   * Triggered when the track is redrawn
   */
  update(t) {
    if (this.disabled || !this.clips.length) return;
    const { millis: e } = t;
    if (yt(this.clipRef) && (!wt(e, this.clipRef) || this.clipRef?.disabled) && (this.clipRef && this.view.removeChild(this.clipRef.view), this.clipRef?.exit()), !!wt(e, this))
      for (let i = 0; i < this.clips.length; i++) {
        const s = (this.pointer + i) % this.clips.length, n = this.clips[s], r = this.clips[s - 1];
        if (wt(e, n) && !n.disabled)
          return this.pointer = s, yt(n) || (n.enter(), this.view.addChild(n.view)), n.update(t);
        if (e < n.start.millis && e > (r?.stop.millis ?? 0)) {
          this.pointer = s;
          return;
        }
      }
  }
  /**
   * Adds a new clip to the track
   * @param clip The clip to add
   * @param index The index to insert the clip at, will be ignored if track is not stacked
   * @throws Error if the clip can't be added
   */
  async add(t, e) {
    return this.composition && !this.composition.renderer && await new Promise(this.composition.resolve("init")), await t.init(), await t.connect(this), await this.strategy.add(t, this, e), t.on("frame", () => {
      this.strategy.update(t, this);
    }), t.bubble(this), this.trigger("attach", void 0), t;
  }
  /**
   * Remove a given clip from the track
   * @returns `Track` when it has been successfully removed `undefined` otherwise
   */
  remove(t) {
    const e = this.clips.findIndex((i) => i.id == t.id);
    if (t.state == "ATTACHED" && (t.state = "READY"), t.view.parent && this.view.removeChild(t.view), e != null && e >= 0)
      return this.clips.splice(e, 1), this.strategy.update(t, this), this.trigger("detach", void 0), t;
  }
  /**
   * Get the first visible frame of the clip
   */
  get stop() {
    return this.clips.at(-1)?.stop ?? new d();
  }
  /**
   * Get the last visible frame of the clip
   */
  get start() {
    return this.clips.at(0)?.start ?? new d();
  }
  /**
   * apply a function to all clips within the track
   */
  apply(t) {
    this.clips.forEach(t);
  }
  /**
   * Remove the track from the composition
   */
  detach() {
    return this.composition?.removeTrack(this), this;
  }
  /**
   * Get the clip that the pointer is
   * currently referencing
   */
  get clipRef() {
    return this.clips[this.pointer];
  }
}
function wt(o, t) {
  return t ? o >= t.start.millis && o <= t.stop.millis : !1;
}
function yt(o) {
  return o ? !!o.view.parent : !1;
}
class Fs {
  static fromType(t) {
    switch (t.type) {
      case "video":
        return new Us();
      case "audio":
        return new Xs();
      case "html":
        return new ks();
      case "image":
        return new Gs();
      case "text":
        return new qt();
      case "complex_text":
        return new qt();
      case "caption":
        return new Ns();
      default:
        return new L();
    }
  }
}
class be extends L {
  clips = [];
  async seek(t) {
    for (const e of this.clips)
      await e.seek(t);
  }
  /**
   * Detect periods of silence across all clips in the track
   *
   * This currently only searches for silences in each clip individually
   *
   * @returns Array of silence periods with start and stop times in seconds
   */
  async removeSilences(t = {}) {
    const e = this.clips.length;
    for (let i = 0; i < e; i++) {
      const s = this.clips[i];
      if (!s.element)
        continue;
      const n = await s.source.silences(t);
      if (n.length === 0)
        continue;
      const r = n.filter(
        (c) => c.start.millis > s.range[0].millis && c.start.millis < s.range[1].millis || c.stop.millis < s.range[1].millis && c.stop.millis > s.range[0].millis
      );
      if (r.length === 0)
        continue;
      let a = s.range[0], l = s;
      for (const c of r) {
        if (c.start.millis <= a.millis) {
          const f = await l.split(c.stop.add(l.offset));
          l.detach(), a = c.stop, l = f;
          continue;
        }
        if (c.stop.millis >= l.range[1].millis) {
          l = await l.split(c.start.add(l.offset)), l.detach();
          continue;
        }
        const u = await l.split(c.start.add(l.offset));
        l = await u.split(c.stop.add(u.offset)), u.detach();
      }
    }
  }
}
class Us extends be {
  type = "video";
  async seek(t) {
    this.composition?.rendering ? this.view.removeChildren() : super.seek(t);
  }
}
class Gs extends L {
  type = "image";
}
class Xs extends be {
  type = "audio";
}
class qt extends L {
  type = "text";
}
class ks extends L {
  type = "html";
}
var Cs = Object.defineProperty, xe = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Cs(t, e, s), s;
};
class ht extends x {
  generatorOptions;
  type = "CLASSIC";
  constructor(t = {}) {
    super(), this.generatorOptions = t.generatorOptions ?? { duration: [0.2] };
  }
  async applyTo(t) {
    if (!t.clip?.transcript || !t.composition?.width)
      throw new g({
        code: "referenceError",
        message: "Captions need to be applied with a defined transcript and composition"
      });
    const e = t.clip?.offset ?? new d(), i = await S.fromFamily({ family: "Figtree", weight: "700" }).load();
    for (const s of t.clip.transcript.iter(this.generatorOptions))
      await t.add(
        new P({
          text: s.words.map((n) => n.text).join(" "),
          textAlign: "center",
          textBaseline: "middle",
          fontSize: 21,
          fillStyle: "#FFFFFF",
          font: i,
          stroke: {
            color: "#000000",
            width: 4,
            join: "round"
          },
          maxWidth: t.composition.width * 0.85,
          shadow: {
            color: "#000000",
            blur: 0,
            distance: 1.1,
            angle: Math.PI * 0.4,
            alpha: 1
          },
          position: "center",
          stop: s.stop.add(e),
          start: s.start.add(e),
          scale: new Z([0, 8], [0.96, 1], { easing: "easeOut" }),
          alpha: new Z([0, 4], [0, 1], { easing: "easeOut" })
        })
      );
  }
}
xe([
  h()
], ht.prototype, "generatorOptions");
xe([
  h()
], ht.prototype, "type");
class Ns extends L {
  /**
   * Defines the media clip that will be
   * used for creating the captions
   */
  clip;
  type = "caption";
  /**
   * The currently active captioning strategy
   */
  preset = new ht();
  /**
   * Defines the media resource from which the
   * captions will be created. It must contain
   * a `Transcript`
   */
  from(t) {
    return this.clip = t, this.clip?.on("offsetBy", (e) => this.offsetBy(e.detail)), this;
  }
  /**
   * If a transcript has been added to the resource
   * you can generate captions with this function
   * @param strategy The caption strategy to use
   * @default ClassicCaptionPreset
   */
  async generate(t) {
    let e = this.preset;
    return typeof t == "object" ? e = t : t && (e = new t()), this.clips = [], this.trigger("update", void 0), this.preset = e, await e.applyTo(this), this.trigger("update", void 0), this;
  }
}
var Os = Object.defineProperty, Gt = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Os(t, e, s), s;
};
class dt extends x {
  generatorOptions;
  type = "SPOTLIGHT";
  color;
  constructor(t = {}) {
    super(), this.generatorOptions = t.generatorOptions ?? { duration: [0.2] }, this.color = t.color ?? "#00FF4C";
  }
  async applyTo(t) {
    if (!t.clip?.transcript || !t.composition?.width)
      throw new g({
        code: "referenceError",
        message: "Captions need to be applied with a defined transcript and composition"
      });
    const e = t.clip?.offset ?? new d(), i = await S.fromFamily({ family: "The Bold Font", weight: "500" }).load();
    for (const s of t.clip.transcript.iter(this.generatorOptions))
      for (let n = 0; n < s.words.length; n++) {
        const r = s.words.map((a) => a.text);
        await t.add(
          new H({
            text: r.join(" "),
            textAlign: "center",
            textBaseline: "middle",
            fillStyle: "#FFFFFF",
            fontSize: 22,
            maxWidth: t.composition.width * 0.8,
            font: i,
            stroke: {
              width: 5,
              color: "#000000"
            },
            shadow: {
              color: "#000000",
              blur: 12,
              alpha: 0.7,
              angle: Math.PI / 4,
              distance: 2
            },
            position: "center",
            styles: [{
              fillStyle: this.color
            }],
            segments: s.words.length > 1 ? [
              {
                index: 0,
                start: r.slice(0, n).join(" ").length,
                stop: r.slice(0, n + 1).join(" ").length
              }
            ] : void 0,
            stop: s.words[n].stop.add(e),
            start: s.words[n].start.add(e)
          })
        );
      }
  }
}
Gt([
  h()
], dt.prototype, "generatorOptions");
Gt([
  h()
], dt.prototype, "type");
Gt([
  h()
], dt.prototype, "color");
var Ts = Object.defineProperty, Ze = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Ts(t, e, s), s;
};
class Xt extends x {
  type = "GUINEA";
  colors;
  constructor(t = {}) {
    super(), this.colors = t.colors ?? ["#1BD724", "#FFEE0C", "#FF2E17"];
  }
  async applyTo(t) {
    if (!t.clip?.transcript || !t.composition?.width)
      throw new g({
        code: "referenceError",
        message: "Captions need to be applied with a defined transcript and composition"
      });
    const e = t.clip?.offset ?? new d(), i = await S.fromFamily({ family: "The Bold Font", weight: "500" }).load();
    for (const s of t.clip.transcript.iter({ length: [18] })) {
      const { segments: n, words: r } = this.splitSequence(s);
      for (let a = 0; a < s.words.length; a++) {
        const l = r[a]?.at(0)?.start, c = r[a]?.at(-1)?.stop;
        !l || !c || await t.add(
          new H({
            text: n.join(`
 `),
            textAlign: "center",
            textBaseline: "middle",
            fontSize: 20,
            fillStyle: "#FFFFFF",
            shadow: {
              color: "#000000",
              blur: 16,
              alpha: 0.8,
              angle: Math.PI / 4,
              distance: 1
            },
            stroke: {
              width: 4,
              color: "#000000"
            },
            maxWidth: t.composition.width * 0.8,
            leading: 1.3,
            font: i,
            textCase: "upper",
            position: "center",
            stop: c.add(e),
            start: l.add(e),
            styles: [
              {
                fillStyle: this.colors[0],
                fontSize: 23
              },
              {
                fillStyle: this.colors[1],
                fontSize: 23
              },
              {
                fillStyle: this.colors[2],
                fontSize: 23
              }
            ],
            segments: [
              {
                index: tt(0, 2),
                start: n.slice(0, a).join(" ").length,
                // i * 2 -> simple method to compensate for '\n '
                stop: n.slice(0, a + 1).join(" ").length + a * 2
              }
            ]
          })
        );
      }
    }
  }
  splitSequence(t) {
    const e = t.text, i = Math.ceil(e.length / 2);
    let s = e.length;
    for (let a = i, l = i; a > 0 && l < t.text.length - 1; a--, l++) {
      if (e[a].match(/ /)) {
        s = a;
        break;
      }
      if (e[l].match(/ /)) {
        s = l;
        break;
      }
    }
    const n = [...Mt(e, s).map((a) => a.trim())], r = Mt(t.words, n[0].split(/ /).length);
    return { segments: n, words: r };
  }
}
Ze([
  h()
], Xt.prototype, "type");
Ze([
  h()
], Xt.prototype, "colors");
var Es = Object.defineProperty, Ve = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Es(t, e, s), s;
};
class kt extends x {
  generatorOptions;
  type = "CASCADE";
  constructor(t = {}) {
    super(), this.generatorOptions = t.generatorOptions ?? { duration: [1.4] };
  }
  async applyTo(t) {
    if (!t.clip?.transcript || !t.composition?.width)
      throw new g({
        code: "referenceError",
        message: "Captions need to be applied with a defined transcript and composition"
      });
    const e = t.clip?.offset ?? new d(), i = await S.fromFamily({ family: "Geologica", weight: "400" }).load();
    for (const s of t.clip.transcript.iter(this.generatorOptions))
      for (let n = 0; n < s.words.length; n++) {
        const r = () => s.words.length == 1 ? s.text : s.words.map((l) => l.text).slice(0, n + 1).join(" ");
        await t.add(
          new P({
            text: r(),
            textAlign: "left",
            textBaseline: "top",
            fillStyle: "#FFFFFF",
            fontSize: 16,
            font: i,
            maxWidth: t.composition.width * 0.7,
            stroke: {
              color: "#000000",
              width: 4,
              join: "round"
            },
            shadow: {
              color: "#000000",
              blur: 8,
              alpha: 0.4,
              angle: Math.PI / 4,
              distance: 2
            },
            position: {
              x: "12%",
              y: "44%"
            },
            stop: s.words[n].stop.add(e),
            start: s.words[n].start.add(e)
          })
        );
      }
  }
}
Ve([
  h()
], kt.prototype, "generatorOptions");
Ve([
  h()
], kt.prototype, "type");
class Wi {
  static fromJSON(t) {
    switch (t.type) {
      case "SPOTLIGHT":
        return dt.fromJSON(t);
      case "CASCADE":
        return kt.fromJSON(t);
      case "GUINEA":
        return Xt.fromJSON(t);
      case "SOLAR":
        return Ct.fromJSON(t);
      case "WHISPER":
        return ut.fromJSON(t);
      default:
        return ht.fromJSON(t);
    }
  }
}
var _s = Object.defineProperty, Re = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && _s(t, e, s), s;
};
class Ct extends x {
  generatorOptions;
  type = "SOLAR";
  constructor(t = {}) {
    super(), this.generatorOptions = t.generatorOptions ?? { duration: [0.2] };
  }
  async applyTo(t) {
    if (!t.clip?.transcript || !t.composition?.width)
      throw new g({
        code: "referenceError",
        message: "Captions need to be applied with a defined transcript and composition"
      });
    const e = await S.fromFamily({ family: "Urbanist", weight: "800" }).load(), i = t.clip?.offset ?? new d(), s = new Xe({
      color: "#fffe41",
      alpha: 0.25,
      distance: 90,
      quality: 0.05
    });
    for (const n of t.clip.transcript.iter(this.generatorOptions))
      await t.add(
        new P({
          text: n.words.map((r) => r.text).join(" "),
          textAlign: "center",
          textBaseline: "middle",
          fontSize: 19,
          fillStyle: "#fffe41",
          font: e,
          maxWidth: t.composition.width * 0.85,
          textCase: "upper",
          shadow: {
            color: "#ab7a00",
            blur: 0,
            distance: 2.1,
            angle: Math.PI / 2.5,
            alpha: 1
          },
          position: "center",
          stop: n.stop.add(i),
          start: n.start.add(i),
          scale: new Z([0, 8], [0.96, 1], { easing: "easeOut" }),
          alpha: new Z([0, 4], [0, 1], { easing: "easeOut" }),
          filters: s
        })
      );
  }
}
Re([
  h()
], Ct.prototype, "generatorOptions");
Re([
  h()
], Ct.prototype, "type");
var Ms = Object.defineProperty, Nt = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Ms(t, e, s), s;
};
class ut extends x {
  generatorOptions;
  type = "WHISPER";
  color;
  constructor(t = {}) {
    super(), this.generatorOptions = t.generatorOptions ?? { length: [20] }, this.color = t.color ?? "#8c8c8c";
  }
  async applyTo(t) {
    if (!t.clip?.transcript || !t.composition?.width)
      throw new g({
        code: "referenceError",
        message: "Captions need to be applied with a defined transcript and composition"
      });
    const e = t.clip?.offset ?? new d(), i = await S.fromFamily({ family: "Montserrat", weight: "300" }).load();
    for (const s of t.clip.transcript.iter(this.generatorOptions))
      for (let n = 0; n < s.words.length; n++) {
        const r = s.words.map((a) => a.text);
        await t.add(
          new H({
            text: r.join(" "),
            textAlign: "center",
            textBaseline: "middle",
            fillStyle: "#FFFFFF",
            fontSize: 13,
            background: {
              alpha: 0.3,
              padding: {
                x: 50,
                y: 30
              }
            },
            maxWidth: t.composition.width * 0.8,
            font: i,
            position: "center",
            styles: [{
              fillStyle: this.color
            }],
            stop: s.words[n].stop.add(e),
            start: s.words[n].start.add(e),
            segments: r.length > 1 ? [
              {
                index: 0,
                start: r.slice(0, n + 1).join(" ").length
              }
            ] : void 0
          })
        );
      }
  }
}
Nt([
  h()
], ut.prototype, "generatorOptions");
Nt([
  h()
], ut.prototype, "type");
Nt([
  h()
], ut.prototype, "color");
var Js = Object.defineProperty, Ot = (o, t, e, i) => {
  for (var s = void 0, n = o.length - 1, r; n >= 0; n--)
    (r = o[n]) && (s = r(t, e, s) || s);
  return s && Js(t, e, s), s;
};
class Tt extends x {
  type = "VERDANT";
  generatorOptions;
  color;
  constructor(t = {}) {
    super(), this.generatorOptions = t.generatorOptions ?? { duration: [1] }, this.color = t.color ?? "#69E34C";
  }
  async applyTo(t) {
    if (!t.clip?.transcript || !t.composition?.width)
      throw new g({
        code: "referenceError",
        message: "Captions need to be applied with a defined transcript and composition"
      });
    const e = t.clip?.offset ?? new d(), i = await S.fromFamily({ family: "Montserrat", weight: "800" }).load();
    for (const s of t.clip.transcript.iter(this.generatorOptions))
      for (let n = 0; n < s.words.length; n++) {
        const r = s.words.map((a) => a.text);
        await t.add(
          new H({
            text: r.join(" "),
            textAlign: "center",
            textBaseline: "middle",
            fontSize: 15,
            fillStyle: "#FFFFFF",
            shadow: {
              color: "#000000",
              blur: 4,
              alpha: 0.7,
              angle: Math.PI / 4,
              distance: 2
            },
            stroke: {
              width: 3,
              color: "#000000"
            },
            maxWidth: t.composition.width * 0.5,
            leading: 1.1,
            font: i,
            textCase: "upper",
            styles: [{
              fillStyle: this.color,
              fontSize: 19
            }],
            position: "center",
            stop: s.words[n].stop.add(e),
            start: s.words[n].start.add(e),
            segments: [{
              index: 0,
              start: r.slice(0, n).join(" ").length,
              stop: r.slice(0, n + 1).join(" ").length
            }]
          })
        );
      }
  }
}
Ot([
  h()
], Tt.prototype, "type");
Ot([
  h()
], Tt.prototype, "generatorOptions");
Ot([
  h()
], Tt.prototype, "color");
class Si extends k(x) {
  _duration = new d();
  /**
   * Access to the underlying pixijs renderer
   */
  renderer;
  /**
   * The root container of the composition
   */
  stage = new I();
  /**
   * Settings of the composition
   */
  settings;
  /**
   * Tracks attached to the composition
   */
  tracks = [];
  /**
   * The current frame that the playback is set to
   */
  frame = 0;
  /**
   * User defined fixed duration, use the duration
   * property to set this value
   */
  fixedDuration;
  /**
   * Defines the current state of the composition
   */
  state = "IDLE";
  /**
   * Defines the fps used for rendering.
   */
  fps = U;
  /**
   * Get the canvas element that has been
   * added to the dom
   */
  canvas;
  /**
   * Defines the context of the external
   * canvas element
   */
  context;
  constructor({
    height: t = 1080,
    width: e = 1920,
    background: i = "#000000",
    backend: s = "webgpu"
  } = {}) {
    super(), this.settings = { height: t, width: e, background: i, backend: s }, this.on("update", this.update.bind(this)), this.on("attach", this.update.bind(this)), this.on("detach", this.update.bind(this)), this.on("load", this.update.bind(this)), this.on("frame", this.update.bind(this)), this.on("error", this.update.bind(this)), Ge({ ...this.settings, preference: s }).then((n) => {
      this.renderer = n, this.trigger("init", void 0);
    }).catch((n) => {
      console.error(n), this.trigger("error", new G({
        code: "backendDetectionError",
        message: `${n}`
      }));
    });
  }
  /**
   * The realtime playback has started
   */
  get playing() {
    return this.state == "PLAY";
  }
  /**
   * Composition is rendering in
   * non realtime
   */
  get rendering() {
    return this.state == "RENDER";
  }
  /**
   * Get the current width of the canvas
   */
  get width() {
    return this.settings.width;
  }
  /**
   * Get the current height of the canvas
   */
  get height() {
    return this.settings.height;
  }
  /**
   * This is where the playback stops playing
   */
  get duration() {
    return this.fixedDuration ? this.fixedDuration : this._duration;
  }
  /**
   * Limit the total duration of the composition
   */
  set duration(t) {
    t ? t instanceof d ? this.fixedDuration = t : this.fixedDuration = d.fromFrames(t) : this.fixedDuration = void 0, this.trigger("frame", this.fixedDuration?.frames ?? 0);
  }
  /**
   * Set the player as a child of the given html div element
   */
  attachPlayer(t) {
    this.canvas || (this.canvas = document.createElement("canvas"), this.canvas.height = this.settings.height, this.canvas.width = this.settings.width, this.canvas.style.background = "black", this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.computeFrame()), t.appendChild(this.canvas);
  }
  /**
   * Remove the player from the dom
   */
  detachPlayer(t) {
    this.canvas && t.removeChild(this.canvas);
  }
  /**
   * Append a new track, it will be inserted at 
   * index 0 and rendered last (top layer)
   */
  shiftTrack(t) {
    const e = typeof t == "object" ? t : new t();
    return e.connect(this), this.stage.addChild(e.view), this.tracks.unshift(e), e.bubble(this), this.trigger("update", void 0), e;
  }
  /**
   * Create a track with the given type
   * @param type the desired type of the track
   * @returns A new track
   */
  createTrack(t) {
    const e = Fs.fromType({ type: t });
    return this.shiftTrack(e), e;
  }
  /**
   * Convenience function for appending a track
   * aswell as the clip to the composition
   */
  async add(t) {
    return await this.createTrack(t.type).add(t), t;
  }
  /**
   * Remove a given clip from the composition
   * @returns `Clip` when it has been successfully removed `undefined` otherwise
   */
  remove(t) {
    for (const e of this.tracks)
      if (e.clips.find((i) => i.id == t.id))
        return e.remove(t);
  }
  /**
   * Remove all tracks that are of the specified type
   * @param track type to be removed
   */
  removeTracks(t) {
    const e = this.tracks.filter((i) => i instanceof t);
    return this.tracks = this.tracks.filter((i) => !(i instanceof t)), e;
  }
  /**
   * Find tracks that match the profided parameters
   */
  findTracks(t) {
    return this.tracks.filter((e) => {
      let i;
      return Jt(t) ? i = e instanceof t : i = t(e), i;
    });
  }
  /**
   * Find clips that match the profided parameters
   */
  findClips(t) {
    const e = [];
    for (const i of this.tracks)
      for (const s of i.clips) {
        let n;
        Jt(t) ? n = s instanceof t : n = t(s), n && e.push(s);
      }
    return e;
  }
  /**
   * Compute the currently active frame
   */
  computeFrame() {
    if (this.renderer) {
      for (let t = 0; t < this.tracks.length; t++)
        this.tracks[t].update(d.fromFrames(this.frame));
      this.renderer.render(this.stage), this.context?.clearRect(0, 0, this.settings.width, this.settings.height), this.context?.drawImage(this.renderer.canvas, 0, 0), this.trigger("currentframe", this.frame), this.playing && this.frame++;
    }
  }
  /**
   * Take a screenshot of the still frame
   */
  screenshot(t = "png", e = 1) {
    if (this.computeFrame(), !this.renderer)
      throw new G({
        code: "rendererNotDefined",
        message: "Please wait until the renderer is defined"
      });
    return this.renderer.canvas.toDataURL(`image/${t}`, e);
  }
  /**
   * Set the playback position to a specific time
   * @param value new playback time
   */
  async seek(t) {
    typeof t == "number" ? this.frame = Math.round(t > 0 ? t : 0) : this.frame = t.frames > 0 ? t.frames : 0, this.playing && this.pause();
    for (const e of this.tracks)
      await e.seek(d.fromFrames(this.frame));
    this.rendering || this.computeFrame();
  }
  /**
   * Play the composition
   */
  async play() {
    if (!this.rendering) {
      this.state = "PLAY", this.frame >= this.duration.frames && (this.frame = 0);
      for (const t of this.tracks)
        await t.seek(d.fromFrames(this.frame));
      this.ticker(), this.trigger("play", this.frame);
    }
  }
  /**
   * Pause the composition
   */
  async pause() {
    this.state = "IDLE", this.computeFrame(), this.trigger("pause", this.frame);
  }
  async audio(t = 2, e = 48e3) {
    const i = this.duration.seconds * e, n = new OfflineAudioContext({
      sampleRate: e,
      length: i,
      numberOfChannels: t
    }).createBuffer(t, i, e);
    for (const r of this.findClips(ot)) {
      if (r.disabled || r.muted || r.track?.disabled)
        continue;
      const a = Math.round(r.offset.seconds * n.sampleRate), l = Math.round(r.range[0].seconds * n.sampleRate), c = Math.round(r.range[1].seconds * n.sampleRate);
      try {
        const u = await r.source.decode(t, e), f = u.numberOfChannels - 1;
        for (let p = 0; p < t; p++) {
          const m = n.getChannelData(p), V = u.getChannelData(
            p > f ? f : p
            // important for mono audio tracks
          );
          for (let w = 0; w < m.length - 1; w++)
            w < a + l || w > a + c || w - a < 0 || (m[w] += (V[w - a] ?? 0) * r.volume, m[w] > 1 && (m[w] = 1), m[w] < -1 && (m[w] = -1));
          n.getChannelData(p).set(m);
        }
      } catch {
      }
    }
    return n;
  }
  /**
   * Get the current playback time and composition
   * duration formatted as `00:00 / 00:00` by default.
   * if **hours** is set the format is `HH:mm:ss` whereas
   * **milliseconds** will return `mm:ss.SSS`
   */
  time(t) {
    const e = E(this.frame), i = t?.hours ? 11 : 14, s = t?.milliseconds ? 23 : 19;
    return new Date(e).toISOString().slice(i, s) + " / " + new Date(this.duration.millis).toISOString().slice(i, s);
  }
  /**
   * Remove a given track from the composition
   * @returns `Track` when it has been successfully removed `undefined` otherwise
   */
  removeTrack(t) {
    const e = this.tracks.findIndex((i) => i.id == t.id);
    if (t.view.parent && this.stage.removeChild(t.view), e != null && e >= 0)
      return this.tracks.splice(e, 1), this.trigger("detach", void 0), t;
  }
  async ticker() {
    const t = 1e3 / U;
    let e = performance.now(), i = 0;
    do {
      const s = await new Promise(requestAnimationFrame);
      s - e < t - i || (i = Math.min(t, i + s - e - t), e = s, this.computeFrame());
    } while (this.frame <= this.duration.frames && this.playing);
    this.playing && this.seek(0);
  }
  /**
   * Updates the state of the composition
   */
  update() {
    this._duration.frames = Math.max(
      ...this.tracks.filter((t) => !t.disabled).map((t) => t.stop?.frames ?? 0),
      0
    ), this.computeFrame();
  }
}
class Ls {
  composition;
  constructor(t) {
    this.composition = t;
  }
  async encode(t, e) {
    const { numberOfChannels: i, sampleRate: s } = e, n = await this.composition.audio(i, s);
    if (!n) return;
    const r = new AudioEncoder({
      output: (l, c) => {
        c && t.addAudioChunk(l, c);
      },
      error: console.error
    });
    r.configure(e);
    const a = new AudioData({
      format: "f32-planar",
      sampleRate: n.sampleRate,
      numberOfChannels: n.numberOfChannels,
      numberOfFrames: n.length,
      timestamp: 0,
      data: _e(n)
    });
    r.encode(a), await r.flush();
  }
}
function Ys(o, t) {
  const e = new Uint8Array(19);
  return e[0] = 79, e[1] = 112, e[2] = 117, e[3] = 115, e[4] = 72, e[5] = 101, e[6] = 97, e[7] = 100, e[8] = 1, e[9] = t, e[10] = 0, e[11] = 0, e[12] = o & 255, e[13] = o >> 8 & 255, e[14] = o >> 16 & 255, e[15] = o >> 24 & 255, e[16] = 0, e[17] = 0, e[18] = 0, e;
}
const St = [8e3, 12e3, 16e3, 24e3, 48e3], Bs = "https://cdn.jsdelivr.net/npm/@diffusionstudio/libopus-wasm@1.0.0/dist/opus.wasm", Is = "https://cdn.jsdelivr.net/npm/@diffusionstudio/libopus-wasm@1.0.0/dist/opus.js";
class ve {
  output;
  error;
  config;
  encoder;
  opus;
  meta;
  /**
   * Create a new OpusEncoder for encoding pcm to opus
   * @param init encoder callbacks
   */
  constructor(t) {
    this.output = t.output, this.error = t.error;
  }
  /**
   * Configure the encoder. **Note** these values must match the samples to encode
   * @param config The sample rate and channel count to use
   */
  async configure(t) {
    const e = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      Is
    ), { numberOfChannels: i, sampleRate: s } = this.config = t;
    if (!St.includes(s))
      throw new X({
        code: "sampleRateNotSupported",
        message: `Unsupported sample rate, supported: ${St.join()}`
      });
    this.opus = await e.default({
      locateFile(n, r) {
        return n.endsWith(".wasm") ? Bs : r + n;
      }
    }), this.encoder = this.opus._opus_encoder_create(s, i, 2048), this.meta = {
      decoderConfig: {
        codec: "opus",
        // Extract or create the OpusHead
        description: Ys(s, i).buffer,
        numberOfChannels: i,
        sampleRate: s
      }
    };
  }
  /**
   * Encode the samples synchronously (this is a blocking event)
   * @param samples The data to encode
   */
  encode({ data: t, numberOfFrames: e, timestamp: i = 0 }) {
    if (!this.encoder || !this.opus || !this.config || !this.meta)
      throw new X({
        code: "unconfiguredEncoder",
        message: "Cannot encode samples using an unconfigured encoder"
      });
    const { sampleRate: s, numberOfChannels: n } = this.config, r = Math.floor(s / 1e3 * 20);
    let a = 0;
    const l = r / s * 1e6;
    for (; a < e; ) {
      const c = t.subarray(a * n, (a + r) * n), u = this.opus._malloc(c.length * 2);
      this.opus.HEAP16.set(c, u >> 1);
      const f = 4e3, p = this.opus._malloc(f), m = this.opus._opus_encode(
        this.encoder,
        u,
        r,
        p,
        f
      );
      if (m > 0) {
        const V = new Uint8Array(
          this.opus.HEAPU8.subarray(p, p + m)
        );
        this.output(
          {
            data: V,
            timestamp: i,
            type: "key",
            duration: l
          },
          this.meta
        );
      } else
        this.error(new DOMException("PCM chunk could not be encoded"));
      this.opus._free(u), this.opus._free(p), a += r, i += l;
    }
  }
}
async function zs(o) {
  if (typeof o == "string") {
    const e = new te();
    return {
      target: e,
      fastStart: "in-memory",
      async close(i) {
        i && (o.match(/^https:\/\//i) ? await js(e.buffer, o) : await ne(new Blob([e.buffer], { type: "video/mp4" }), o));
      }
    };
  }
  const t = await o.createWritable();
  return {
    target: new ke(t),
    fastStart: !1,
    async close(e) {
      await t.close();
    }
  };
}
async function js(o, t) {
  const e = await fetch(t, {
    method: "PUT",
    headers: {
      "Content-Type": "video/mp4"
    },
    body: o
  });
  if (!e.ok)
    throw new v({
      code: "fileUpdloadFailed",
      message: `Error uploading buffer: ${e.status} ${e.statusText}`
    });
}
async function Ps(o) {
  const t = await o;
  for (const e of t)
    if (e.status == "rejected")
      throw e.reason;
}
function Hs(o, t, e) {
  const s = ((/* @__PURE__ */ new Date()).getTime() - e) / As(o) * (t - o);
  return { remaining: new Date(s), progress: o, total: t };
}
function As(o) {
  return o < 1 ? 1 : o;
}
function Ds(o) {
  return o instanceof ot && !o.disabled && !o.track?.disabled;
}
function We(o) {
  const t = St;
  let e = 48e3;
  for (const i of t)
    Math.abs(o - i) < Math.abs(o - e) && (e = i);
  return e;
}
class Qs {
  composition;
  constructor(t) {
    this.composition = t;
  }
  async encode(t, e) {
    const i = e.numberOfChannels, s = We(e.sampleRate), n = await this.composition.audio(i, s);
    if (!n) return;
    const r = new ve({
      output: (a, l) => {
        t.addAudioChunkRaw(
          a.data,
          a.type,
          a.timestamp,
          a.duration,
          l
        );
      },
      error: console.error
    });
    await r.configure({ ...e, sampleRate: s }), r.encode({
      data: se(n),
      numberOfFrames: n.length
    });
  }
}
class Ks extends ze() {
  composition;
  resolution;
  sampleRate;
  numberOfChannels;
  videoBitrate;
  gpuBatchSize;
  fps;
  debug;
  audio;
  constructor(t, e) {
    super(), this.composition = t, this.resolution = e?.resolution ?? 1, this.sampleRate = e?.sampleRate ?? 48e3, this.numberOfChannels = e?.numberOfChannels ?? 2, this.videoBitrate = e?.videoBitrate ?? 1e7, this.gpuBatchSize = e?.gpuBatchSize ?? 5, this.fps = e?.fps ?? 30, this.debug = e?.debug ?? !1, this.audio = e?.audio ?? !0;
  }
  /**
   * render and encode visual frames
   */
  async encodeVideo(t, e, i) {
    const { renderer: s, tracks: n, duration: r } = this.composition, a = Math.floor(r.seconds * this.fps);
    if (!s)
      throw new X({
        code: "rendererNotInitialized",
        message: "Cannot encode composition before the renderer has been initialized"
      });
    await this.composition.seek(0);
    const l = (/* @__PURE__ */ new Date()).getTime(), c = new VideoEncoder({
      output(f, p) {
        p && t.addVideoChunk(f, p);
      },
      error: console.error
    });
    c.configure(e);
    const u = performance.now();
    for (let f = 0; f <= a; f++) {
      if (i && i.aborted)
        throw this.composition.findClips(vt).forEach((m) => m.cancelDecoding()), new DOMException("User aborted rendering");
      c.encodeQueueSize > this.gpuBatchSize && await new Promise((m) => {
        c.ondequeue = () => m(null);
      });
      for (let m = 0; m < n.length; m++)
        await n[m].update(d.fromFrames(f, this.fps));
      s.render(this.composition.stage), this.trigger("render", Hs(f, a, l));
      const p = new VideoFrame(s.canvas, {
        timestamp: Math.floor(f / this.fps * 1e6),
        duration: Math.floor(1e6 / this.fps)
      });
      c.encode(p, { keyFrame: f % (3 * this.fps) == 0 }), p.close();
    }
    if (this.debug) {
      const f = (performance.now() - u) / 1e3;
      console.info(`RENDERED AT: ${(a / f).toFixed(2)}fps`);
    }
    await c.flush();
  }
}
class $s extends Ks {
  audioEncoder;
  /**
   * Create a new audio and video encoder and multiplex the result 
   * using a mp4 container
   * @param composition The composition to render
   * @param options Configure the output
   * @example 
   * ```
   * new Encoder(composition, { resolution: 2 }).render() // will render at 4K
   * ```
   */
  constructor(t, e) {
    super(t, e);
  }
  /**
   * Export the specified composition
   * @throws DOMException if the export has been aborted
   */
  async render(t = "video.mp4", e) {
    if (!this.composition.renderer)
      throw new X({
        code: "rendererNotInitialized",
        message: "Cannot encode composition before the renderer has been initialized"
      });
    const [i, s] = await this.getConfigs();
    this.debug && console.info("Hardware Preference", i.hardwareAcceleration);
    const n = performance.now(), r = await zs(t), a = this.composition.findClips(Ds) && this.audio;
    a || (this.audioEncoder = void 0), await this.composition.pause(), this.composition.state = "RENDER", this.composition.renderer.resolution = this.resolution, this.composition.fps = this.fps;
    try {
      const l = new ee({
        target: r.target,
        video: { ...i, codec: "avc" },
        firstTimestampBehavior: "offset",
        fastStart: r.fastStart,
        audio: a ? {
          ...s,
          codec: s.codec == "opus" ? "opus" : "aac"
        } : void 0
      });
      if (await Ps(Promise.allSettled([
        this.encodeVideo(l, i, e),
        this.audioEncoder?.encode(l, s)
      ])), this.debug) {
        const c = (performance.now() - n) / 1e3;
        console.info(`TOTAL DURATION: ${c.toFixed(3)}sec`);
      }
      l.finalize(), await r.close(!0);
    } catch (l) {
      throw console.error("export error", l), await r.close(!1), l;
    } finally {
      this.composition.state = "IDLE", this.composition.renderer.resolution = 1, this.composition.fps = U;
    }
  }
  /**
   * Check which configurations are supported and select the best
   * @returns A supported audio and video configuration
   */
  async getConfigs() {
    const { height: t, width: e } = this.composition.settings, { numberOfChannels: i, sampleRate: s, videoBitrate: n, fps: r, resolution: a } = this;
    let [l, c] = await Le({
      video: {
        height: Math.round(t * a),
        width: Math.round(e * a),
        bitrate: n,
        fps: r
      },
      audio: {
        sampleRate: s,
        numberOfChannels: i,
        bitrate: 128e3
      }
    });
    return c ? this.audioEncoder = new Ls(this.composition) : (this.audioEncoder = new Qs(this.composition), c = { codec: "opus", numberOfChannels: i, sampleRate: s }), [l, c];
  }
  /**
   * @deprecated please replace with `render`
   */
  async export(t = "video.mp4") {
    return await this.render(t);
  }
}
class Fi extends $s {
}
class Ui {
  canvas;
  muxer;
  videoEncoder;
  frame = 0;
  sampleRate;
  numberOfChannels;
  videoBitrate;
  gpuBatchSize;
  fps;
  height;
  width;
  audio;
  /**
   * Create a new Webcodecs encoder
   * @param canvas - The canvas to encode
   * @param init - Configure the output
   * @example
   * ```
   * const encoder = new CanvasEncoder(canvas, { fps: 60 });
   * ```
   */
  constructor(t, e) {
    this.canvas = t, this.width = t.width, this.height = t.height, this.fps = e?.fps ?? 30, this.sampleRate = We(e?.sampleRate ?? 48e3), this.numberOfChannels = e?.numberOfChannels ?? 2, this.videoBitrate = e?.videoBitrate ?? 1e7, this.gpuBatchSize = e?.gpuBatchSize ?? 5, this.audio = e?.audio ?? !1;
  }
  /**
   * Initiate the encoders and muxers
   * @returns {Promise<void>} - A promise that resolves when initialization is complete
   */
  async init() {
    const t = await ie({
      height: Math.round(this.height),
      width: Math.round(this.width),
      bitrate: this.videoBitrate,
      fps: this.fps
    });
    this.muxer = new ee({
      target: new te(),
      video: { ...t[0], codec: "avc" },
      firstTimestampBehavior: "offset",
      fastStart: "in-memory",
      audio: this.audio ? {
        numberOfChannels: this.numberOfChannels,
        sampleRate: this.sampleRate,
        codec: "opus"
      } : void 0
    });
    const e = {
      output: (i, s) => {
        s && this.muxer.addVideoChunk(i, s);
      },
      error: console.error
    };
    this.videoEncoder = new VideoEncoder(e), this.videoEncoder.configure(t[0]);
  }
  /**
   * Encode the next video frame, the current time will be incremented thereafter
   * @param canvas - Optionally provide a canvas to encode
   * @returns {Promise<void>} - A promise that resolves when the frame has been encoded
   */
  async encodeVideo(t) {
    this.videoEncoder || await this.init(), this.videoEncoder.encodeQueueSize > this.gpuBatchSize && await new Promise((i) => {
      this.videoEncoder.ondequeue = () => i(null);
    });
    const e = new VideoFrame(t ?? this.canvas, {
      timestamp: Math.floor(this.frame / this.fps * 1e6),
      duration: Math.floor(1e6 / this.fps)
    });
    this.videoEncoder?.encode(e, { keyFrame: this.frame % (3 * this.fps) == 0 }), e.close(), this.frame++;
  }
  /**
   * Encode an audio buffer using the encoder configuration added in the constructor
   * @param buffer - The audio buffer to encode
   * @returns {Promise<void>} - A promise that resolves when the audio has been added to the encoder queue
   */
  async encodeAudio(t) {
    if (!this.audio)
      throw new X({
        code: "initializationError",
        message: "Encoder must be initialized using {audio: true} to use this method"
      });
    this.muxer || await this.init();
    const e = Me(t, this.sampleRate, this.numberOfChannels), i = new ve({
      output: (s, n) => {
        this.muxer?.addAudioChunkRaw(
          s.data,
          s.type,
          s.timestamp,
          s.duration,
          n
        );
      },
      error: console.error
    });
    await i.configure({
      numberOfChannels: this.numberOfChannels,
      sampleRate: this.sampleRate
    }), i.encode({
      data: se(e),
      numberOfFrames: e.length
    });
  }
  /**
   * Finalizes the rendering process and creates a blob
   * @returns {Promise<Blob>} - The rendered video as a Blob
   */
  async blob() {
    await this.videoEncoder?.flush(), this.muxer?.finalize();
    const t = this.muxer?.target.buffer;
    if (!t)
      throw new X({
        code: "unexpectedRenderError",
        message: "Muxer could not be finalized because the target buffer is not defined"
      });
    return new Blob([t], { type: "video/mp4" });
  }
  /**
   * @deprecated use `blob` instead
   */
  async export() {
    return this.blob();
  }
}
export {
  it as AudioClip,
  B as AudioSource,
  Xs as AudioTrack,
  G as BaseError,
  Ui as CanvasEncoder,
  Wi as CaptionPresetDeserializer,
  Ns as CaptionTrack,
  kt as CascadeCaptionPreset,
  xi as CircleMask,
  ht as ClassicCaptionPreset,
  _ as Clip,
  yi as ClipDeserializer,
  H as ComplexTextClip,
  Si as Composition,
  Zi as EllipseMask,
  $s as Encoder,
  X as EncoderError,
  ze as EventEmitter,
  k as EventEmitterMixin,
  si as ExportError,
  U as FPS_DEFAULT,
  S as Font,
  Xt as GuineaCaptionPreset,
  At as HtmlClip,
  xt as HtmlSource,
  ks as HtmlTrack,
  v as IOError,
  jt as ImageClip,
  Zt as ImageSource,
  Gs as ImageTrack,
  Z as Keyframe,
  bt as Language,
  ot as MediaClip,
  be as MediaTrack,
  ve as OpusEncoder,
  Vi as RectangleMask,
  _t as ReferenceError,
  Ri as RoundRectangleMask,
  Vs as SUPPORTED_MIME_TYPES,
  x as Serializer,
  Ct as SolarCaptionPreset,
  W as Source,
  dt as SpotlightCaptionPreset,
  vi as StarMask,
  pt as StorageItem,
  mi as Store,
  P as TextClip,
  qt as TextTrack,
  gi as Thread,
  d as Timestamp,
  L as Track,
  Fs as TrackDeserializer,
  T as Transcript,
  g as ValidationError,
  Tt as VerdantCaptionPreset,
  vt as VideoClip,
  Vt as VideoSource,
  Us as VideoTrack,
  rt as VisualMixin,
  $ as WebFonts,
  Fi as WebcodecsEncoder,
  ut as WhisperCaptionPreset,
  Bt as Word,
  D as WordGroup,
  Ne as arraymove,
  ai as assert,
  di as audioBufferToWav,
  ui as blobToMonoBuffer,
  _e as bufferToF32Planar,
  se as bufferToI16Interleaved,
  hi as capitalize,
  li as debounce,
  ne as downloadObject,
  Te as floatTo16BitPCM,
  E as framesToMillis,
  ii as framesToSeconds,
  Je as getAudioEncoderConfigs,
  Le as getSupportedEncoderConfigs,
  ie as getVideoEncoderConfigs,
  oi as groupBy,
  Oe as interleave,
  Jt as isClass,
  Wt as parseMimeType,
  tt as randInt,
  Me as resampleBuffer,
  Ce as secondsToFrames,
  h as serializable,
  fi as showFileDialog,
  ri as sleep,
  Ye as sortHardwareAcceleration,
  Mt as splitAt,
  ni as toHex,
  ci as uid,
  at as visualize,
  wi as withThreadErrorHandler
};
