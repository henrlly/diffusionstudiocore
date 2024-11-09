import { CanvasTextMetrics } from 'pixi.js';
import { Container } from 'pixi.js';
import { ContainerChild } from 'pixi.js';
import { Filter } from 'pixi.js';
import { Graphics } from 'pixi.js';
import { Muxer } from 'mp4-muxer';
import { Renderer } from 'pixi.js';
import { Sprite } from 'pixi.js';
import { StreamTarget } from 'mp4-muxer';
import { Text as Text_2 } from 'pixi.js';
import { TextStyle } from 'pixi.js';
import { Texture } from 'pixi.js';

/**
 * Defines the position of the anchor as
 * a ratio of the width an height
 */
export declare type Anchor = {
    x: float;
    y: float;
};

declare interface AnimationBuilder extends AnimationBuilder_2 {
    height: AnimationFunction<number, this>;
    width: AnimationFunction<number, this>;
    x: AnimationFunction<number, this>;
    y: AnimationFunction<number, this>;
    translateX: AnimationFunction<number, this>;
    translateY: AnimationFunction<number, this>;
    rotation: AnimationFunction<number, this>;
    alpha: AnimationFunction<number, this>;
    scale: AnimationFunction<number, this>;
}

declare class AnimationBuilder extends AnimationBuilder_2 {
}

declare interface AnimationBuilder_2 {
    to(value: number, relframe: number): this;
}

declare class AnimationBuilder_2 {
    private target;
    animation: Keyframe_2<string | number> | undefined;
    constructor(target: any);
    init(property: string | symbol, value: number | string, delay?: number, easing?: EasingFunction): void;
}

declare type AnimationFunction<V extends number | string, T> = (value: V, delay?: number, easing?: EasingFunction) => T;

export declare type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

/**
 * Move an element inside the provided array
 */
export declare function arraymove(arr: any[], fromIndex: number, toIndex: number): void;

/**
 * clip assert replacement for the browser
 * @example assert(true == false)
 */
export declare function assert(condition: any): void;

/**
 * Converts the specified AudioBuffer to a Blob.
 *
 * Note that changing the MIME type does not change the actual file format.
 * The output is a WAVE in any case
 */
export declare function audioBufferToWav(buffer: AudioBuffer, type?: string): Blob;

export declare class AudioClip extends MediaClip<AudioClipProps> {
    readonly type = "audio";
    track?: Track<AudioClip>;
    source: AudioSource<{}>;
    /**
     * Access to the HTML5 audio element
     */
    readonly element: HTMLAudioElement;
    constructor(source?: File | AudioSource, props?: AudioClipProps);
    init(): Promise<void>;
    update(): void | Promise<void>;
    exit(): void;
    copy(): AudioClip;
}

export declare interface AudioClipProps extends MediaClipProps {
}

export declare type AudioMimeType = keyof (typeof SUPPORTED_MIME_TYPES)['AUDIO'];

declare type AudioSettings = {
    sampleRate: number;
    numberOfChannels: number;
    bitrate: number;
};

export declare class AudioSource<T extends Object = {}> extends Source<T> {
    readonly type: ClipType;
    private decoding;
    private _silences?;
    transcript?: Transcript;
    audioBuffer?: AudioBuffer;
    decode(numberOfChannels?: number, sampleRate?: number, cache?: boolean): Promise<AudioBuffer>;
    /**
     * @deprecated Use fastsampler instead.
     */
    samples(numberOfSampes?: number, windowSize?: number, min?: number): Promise<number[]>;
    /**
     * Fast sampler that uses a window size to calculate the max value of the samples in the window.
     * @param options - Sampling options.
     * @returns An array of the max values of the samples in the window.
     */
    fastsampler({ length, start, stop, logarithmic, }?: FastSamplerOptions): Promise<Float32Array>;
    thumbnail(...args: ArgumentTypes<this['samples']>): Promise<HTMLElement>;
    /**
     * Find silences in the audio clip. Results are cached.
     *
     * uses default sample rate of 3000
     * @param options - Silences options.
     * @returns An array of the silences (in ms) in the clip.
     */
    silences({ threshold, minDuration, windowSize, }?: SilenceOptions): Promise<{
        start: Timestamp;
        stop: Timestamp;
    }[]>;
}

export declare class AudioTrack extends MediaTrack<AudioClip> {
    readonly type = "audio";
}

export declare type Background = {
    /**
     * @default #000000
     */
    fill?: string;
    /**
     * @default 1
     */
    alpha?: number;
    /**
     * @default 20
     */
    borderRadius?: number;
    /**
     * @default { x: 40, y: 10 }
     */
    padding?: {
        x: int;
        y: int;
    };
};

declare type BaseClass = {
    view: Container;
} & Serializer;

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
export declare class BaseError extends Error {
    readonly message: string;
    readonly code: string;
    constructor({ message, code }: {
        message?: string | undefined;
        code?: string | undefined;
    }, ...args: any[]);
}

declare type BaseEvents<E = {}> = {
    '*': any;
    error: Error;
} & E;

/**
 * Merges the channels of the audio blob into a mono AudioBuffer
 */
export declare function blobToMonoBuffer(blob: Blob, sampleRate?: number, scalingFactor?: number): Promise<AudioBuffer>;

/**
 * Convert an audio buffer into a planar float 32 array
 */
export declare function bufferToF32Planar(input: AudioBuffer): Float32Array;

/**
 * Conver an audio buffer inter a interleaved int 16 array
 */
export declare function bufferToI16Interleaved(audioBuffer: AudioBuffer): Int16Array;

/**
 * Generic encoder that allows you to encode
 * a canvas frame by frame
 */
export declare class CanvasEncoder implements Required<EncoderInit> {
    private canvas;
    private muxer?;
    private videoEncoder?;
    frame: frame;
    sampleRate: number;
    numberOfChannels: number;
    videoBitrate: number;
    gpuBatchSize: number;
    fps: number;
    height: number;
    width: number;
    audio: boolean;
    /**
     * Create a new Webcodecs encoder
     * @param canvas - The canvas to encode
     * @param init - Configure the output
     * @example
     * ```
     * const encoder = new CanvasEncoder(canvas, { fps: 60 });
     * ```
     */
    constructor(canvas: HTMLCanvasElement | OffscreenCanvas, init?: EncoderInit);
    /**
     * Initiate the encoders and muxers
     * @returns {Promise<void>} - A promise that resolves when initialization is complete
     */
    private init;
    /**
     * Encode the next video frame, the current time will be incremented thereafter
     * @param canvas - Optionally provide a canvas to encode
     * @returns {Promise<void>} - A promise that resolves when the frame has been encoded
     */
    encodeVideo(canvas?: HTMLCanvasElement | OffscreenCanvas): Promise<void>;
    /**
     * Encode an audio buffer using the encoder configuration added in the constructor
     * @param buffer - The audio buffer to encode
     * @returns {Promise<void>} - A promise that resolves when the audio has been added to the encoder queue
     */
    encodeAudio(buffer: AudioBuffer): Promise<void>;
    /**
     * Finalizes the rendering process and creates a blob
     * @returns {Promise<Blob>} - The rendered video as a Blob
     */
    blob(): Promise<Blob>;
    /**
     * @deprecated use `blob` instead
     */
    export(): Promise<Blob>;
}

export declare function capitalize(str: string): string;

export declare class CaptionPresetDeserializer {
    static fromJSON<K extends {
        type?: CaptionPresetType;
    }>(data: K extends string ? never : K): CaptionPresetStrategy;
}

export declare interface CaptionPresetStrategy {
    /**
     * Defines the type of strategy
     */
    type: CaptionPresetType;
    /**
     * This function applies the settings to the track
     */
    applyTo(track: CaptionTrack): Promise<void>;
}

declare type CaptionPresetType = 'CLASSIC' | 'SPOTLIGHT' | 'CASCADE' | 'GUINEA' | 'SOLAR' | 'WHISPER' | 'VERDANT' | string;

/**
 * Defines the captions transport format
 */
export declare type Captions = {
    /**
     * Defines the word or token
     * currently spoken
     */
    token: string;
    /**
     * Defines the time when the token
     * will be spoken in **milliseconds**
     */
    start: number;
    /**
     * Defines the time when the token
     * has been spoken in **milliseconds**
     */
    stop: number;
}[][];

export declare class CaptionTrack extends Track<TextClip> {
    /**
     * Defines the media clip that will be
     * used for creating the captions
     */
    clip?: MediaClip;
    readonly type = "caption";
    /**
     * The currently active captioning strategy
     */
    preset: CaptionPresetStrategy;
    /**
     * Defines the media resource from which the
     * captions will be created. It must contain
     * a `Transcript`
     */
    from(value: MediaClip | undefined): this;
    /**
     * If a transcript has been added to the resource
     * you can generate captions with this function
     * @param strategy The caption strategy to use
     * @default ClassicCaptionPreset
     */
    generate(strategy?: CaptionPresetStrategy | (new () => CaptionPresetStrategy)): Promise<this>;
}

export declare class CascadeCaptionPreset extends Serializer implements CaptionPresetStrategy {
    generatorOptions: GeneratorOptions;
    readonly type = "CASCADE";
    constructor(config?: Partial<DefaultCaptionPresetConfig>);
    applyTo(track: CaptionTrack): Promise<void>;
}

/**
 * A circular mask of a given radius
 */
export declare class CircleMask extends Mask {
    private _radius;
    constructor(props: CircleMaskProps);
}

declare interface CircleMaskProps extends MaskProps {
    radius: number;
}

export declare class ClassicCaptionPreset extends Serializer implements CaptionPresetStrategy {
    generatorOptions: GeneratorOptions;
    readonly type: CaptionPresetType;
    constructor(config?: Partial<DefaultCaptionPresetConfig>);
    applyTo(track: CaptionTrack): Promise<void>;
}

export declare class Clip<Props extends ClipProps = ClipProps> extends Clip_base {
    _name: undefined | string;
    _start: Timestamp;
    _stop: Timestamp;
    /**
     * Defines the type of the clip
     */
    readonly type: ClipType;
    /**
     * Defines the source of the clip with a
     * one-to-many (1:n) relationship
     */
    source?: Source;
    /**
     * The view that contains the render related information
     */
    readonly view: Container<ContainerChild>;
    /**
     * Timestamp when the clip has been created
     */
    readonly createdAt: Date;
    /**
     * Controls the visability of the clip
     */
    disabled: boolean;
    /**
     * Track is ready to be rendered
     */
    state: ClipState;
    /**
     * Access the parent track
     */
    track?: Track<Clip>;
    /**
     * Human readable identifier ot the clip
     */
    get name(): string | undefined;
    set name(name: string);
    /**
     * Get the first visible frame
     */
    get start(): Timestamp;
    /**
     * Get the last visible frame
     */
    get stop(): Timestamp;
    constructor(props?: ClipProps);
    /**
     * Method for connecting the track with the clip
     */
    connect(track: Track<Clip>): Promise<void>;
    /**
     * Change clip's offset to zero in seconds. Can be negative
     */
    set start(time: frame | Timestamp);
    /**
     * Set the last visible time that the
     * clip is visible
     */
    set stop(time: frame | Timestamp);
    /**
     * Offsets the clip by a given frame number
     */
    offsetBy(time: frame | Timestamp): this;
    /**
     * Triggered when the clip is
     * added to the composition
     */
    init(): Promise<void>;
    /**
     * Triggered when the clip enters the scene
     */
    enter(): void;
    /**
     * Triggered for each redraw of the scene.
     * Can return a promise which will be awaited
     * during export.
     * @param time the current time to render
     */
    update(time: Timestamp): void | Promise<void>;
    /**
     * Triggered when the clip exits the scene
     */
    exit(): void;
    /**
     * Remove the clip from the track
     */
    detach(): this;
    /**
     * Split the clip into two clips at the specified time
     * @param time split, will use the current frame of the composition
     * a fallback
     * @returns The clip that was created by performing this action
     */
    split(time?: frame | Timestamp): Promise<this>;
    /**
     * Create a copy of the clip
     */
    copy(): Clip;
    /**
     * Modify the properties of the clip and
     * trigger an update afterwards
     */
    set(props?: Props): this;
}

declare const Clip_base: {
    new (...args: any[]): {
        _handlers: {
            '*'?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            error?: {
                [x: string]: (event: EmittedEvent<Error, any>) => void;
            } | undefined;
            offsetBy?: {
                [x: string]: (event: EmittedEvent<Timestamp, any>) => void;
            } | undefined;
            update?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            frame?: {
                [x: string]: (event: EmittedEvent<number | undefined, any>) => void;
            } | undefined;
            attach?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
            detach?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
            load?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
        };
        on<T extends "*" | "error" | keyof ClipEvents>(eventType: T, callback: (event: EmittedEvent<BaseEvents<ClipEvents>[T], any>) => void): string;
        off(id?: string, ...ids: string[]): void;
        trigger<T extends "*" | "error" | keyof ClipEvents>(eventType: T, detail: BaseEvents<ClipEvents>[T]): void;
        bubble(target: any): string;
        resolve(eventType: "*" | "error" | keyof ClipEvents): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
    };
} & typeof Serializer;

export declare class ClipDeserializer {
    static fromType(data: {
        type: ClipType;
    }): Clip;
    static fromSource(data: Source): VideoClip | AudioClip | HtmlClip | ImageClip | undefined;
}

export declare type ClipEvents = {
    offsetBy: Timestamp;
    update: any;
    frame: number | undefined;
    attach: undefined;
    detach: undefined;
    load: undefined;
};

export declare interface ClipProps {
    disabled?: boolean;
    name?: string;
    start?: frame | Timestamp;
    stop?: frame | Timestamp;
}

export declare type ClipState = 'IDLE' | 'LOADING' | 'ATTACHED' | 'READY' | 'ERROR';

export declare type ClipType = 'image' | 'audio' | 'text' | 'video' | 'base' | 'html' | 'complex_text';

export declare class ComplexTextClip extends TextClip<ComplexTextClipProps> {
    readonly type = "complex_text";
    track?: Track<ComplexTextClip>;
    private _maxWidth?;
    private _textAlign;
    private _textBaseline;
    /**
     * Access to the container that contains
     * all text objects
     */
    model: Container<Text_2>;
    segments: types_2.TextSegment[];
    metrics: TextMetrics_2;
    background?: types_2.Background;
    styles?: types_2.StyleOption[];
    constructor(props?: string | ComplexTextClipProps);
    /**
     * Set the copy for the text object. To split a line you can use '\n'.
     */
    get text(): string;
    set text(value: string);
    /**
     * The width at which text will wrap
     */
    get maxWidth(): number | undefined;
    set maxWidth(value: number | undefined);
    /**
     * Alignment for multiline text, does not affect single line text.
     */
    get textAlign(): types_2.TextAlign;
    set textAlign(value: types_2.TextAlign);
    /**
     * The baseline of the text that is rendered.
     */
    get textBaseline(): types_2.TextBaseline;
    set textBaseline(value: types_2.TextBaseline);
    copy(): ComplexTextClip;
    private createRenderSplits;
    private createTextMetrics;
    private createTextStyles;
    private drawBackground;
    protected reflectUpdate(): void;
}

export declare interface ComplexTextClipProps extends TextClipProps {
    segments?: TextSegment[];
    background?: Background;
    styles?: StyleOption[];
}

export declare class Composition extends Composition_base {
    private _duration;
    /**
     * Access to the underlying pixijs renderer
     */
    renderer?: Renderer;
    /**
     * The root container of the composition
     */
    stage: Container<ContainerChild>;
    /**
     * Settings of the composition
     */
    settings: CompositionSettings;
    /**
     * Tracks attached to the composition
     */
    tracks: Track<Clip>[];
    /**
     * The current frame that the playback is set to
     */
    frame: frame;
    /**
     * User defined fixed duration, use the duration
     * property to set this value
     */
    fixedDuration?: Timestamp;
    /**
     * Defines the current state of the composition
     */
    state: CompositionState;
    /**
     * Defines the fps used for rendering.
     */
    fps: float;
    /**
     * Get the canvas element that has been
     * added to the dom
     */
    canvas?: HTMLCanvasElement;
    /**
     * Defines the context of the external
     * canvas element
     */
    private context?;
    constructor({ height, width, background, backend, }?: Partial<CompositionSettings>);
    /**
     * The realtime playback has started
     */
    get playing(): boolean;
    /**
     * Composition is rendering in
     * non realtime
     */
    get rendering(): boolean;
    /**
     * Get the current width of the canvas
     */
    get width(): number;
    /**
     * Get the current height of the canvas
     */
    get height(): number;
    /**
     * This is where the playback stops playing
     */
    get duration(): Timestamp;
    /**
     * Limit the total duration of the composition
     */
    set duration(time: frame | Timestamp | undefined);
    /**
     * Set the player as a child of the given html div element
     */
    attachPlayer(element: HTMLElement): void;
    /**
     * Remove the player from the dom
     */
    detachPlayer(element: HTMLElement): void;
    /**
     * Append a new track, it will be inserted at
     * index 0 and rendered last (top layer)
     */
    shiftTrack<L extends Track<Clip>>(Track: (new () => L) | L): L;
    /**
     * Create a track with the given type
     * @param type the desired type of the track
     * @returns A new track
     */
    createTrack<T extends TrackType>(type: T): TrackMap[T];
    /**
     * Convenience function for appending a track
     * aswell as the clip to the composition
     */
    add<L extends Clip>(clip: L): Promise<L>;
    /**
     * Remove a given clip from the composition
     * @returns `Clip` when it has been successfully removed `undefined` otherwise
     */
    remove<L extends Clip>(clip: L): L | undefined;
    /**
     * Remove all tracks that are of the specified type
     * @param track type to be removed
     */
    removeTracks(Track: new (composition: Composition) => Track<Clip>): Track<Clip>[];
    /**
     * Find tracks that match the profided parameters
     */
    findTracks<T extends Track<Clip>>(predicate: ((value: Track<Clip>) => boolean) | (new () => T)): T[];
    /**
     * Find clips that match the profided parameters
     */
    findClips<T extends Clip>(predicate: ((value: Clip) => boolean) | (new () => T)): T[];
    /**
     * Compute the currently active frame
     */
    computeFrame(): void;
    /**
     * Take a screenshot of the still frame
     */
    screenshot(format?: ScreenshotImageFormat, quality?: number): string;
    /**
     * Set the playback position to a specific time
     * @param value new playback time
     */
    seek(value: frame | Timestamp): Promise<void>;
    /**
     * Play the composition
     */
    play(): Promise<void>;
    /**
     * Pause the composition
     */
    pause(): Promise<void>;
    audio(numberOfChannels?: number, sampleRate?: number): Promise<AudioBuffer>;
    /**
     * Get the current playback time and composition
     * duration formatted as `00:00 / 00:00` by default.
     * if **hours** is set the format is `HH:mm:ss` whereas
     * **milliseconds** will return `mm:ss.SSS`
     */
    time(precision?: {
        hours?: boolean;
        milliseconds?: boolean;
    }): string;
    /**
     * Remove a given track from the composition
     * @returns `Track` when it has been successfully removed `undefined` otherwise
     */
    removeTrack<T extends Track<Clip>>(track: T): T | undefined;
    private ticker;
    /**
     * Updates the state of the composition
     */
    private update;
}

declare const Composition_base: {
    new (...args: any[]): {
        _handlers: {
            '*'?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            error?: {
                [x: string]: (event: EmittedEvent<Error, any>) => void;
            } | undefined;
            play?: {
                [x: string]: (event: EmittedEvent<frame, any>) => void;
            } | undefined;
            pause?: {
                [x: string]: (event: EmittedEvent<frame, any>) => void;
            } | undefined;
            init?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
            currentframe?: {
                [x: string]: (event: EmittedEvent<frame, any>) => void;
            } | undefined;
            update?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            frame?: {
                [x: string]: (event: EmittedEvent<number | undefined, any>) => void;
            } | undefined;
            attach?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
            detach?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
            load?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
        };
        on<T extends "*" | "error" | keyof CompositionEvents>(eventType: T, callback: (event: EmittedEvent<BaseEvents<CompositionEvents>[T], any>) => void): string;
        off(id?: string, ...ids: string[]): void;
        trigger<T extends "*" | "error" | keyof CompositionEvents>(eventType: T, detail: BaseEvents<CompositionEvents>[T]): void;
        bubble(target: any): string;
        resolve(eventType: "*" | "error" | keyof CompositionEvents): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
    };
} & typeof Serializer;

/**
 * Defines the type of events emitted by the
 * composition
 */
export declare type CompositionEvents = {
    play: frame;
    pause: frame;
    init: undefined;
    currentframe: frame;
    update: any;
    frame: number | undefined;
    attach: undefined;
    detach: undefined;
    load: undefined;
};

export declare type CompositionSettings = {
    /**
     * Height of the composition
     *
     * @default 1080
     */
    height: int;
    /**
     * Width of the composition
     *
     * @default 1920
     */
    width: int;
    /**
     * Background color of the composition
     *
     * @default #000000
     */
    background: hex;
    /**
     * Overwrite the backend auto detection.
     * *While webgpu is faster than webgl
     * it might not be available in your
     * browser yet.*
     */
    backend: 'webgpu' | 'webgl';
};

export declare type CompositionState = 'IDLE' | 'RENDER' | 'PLAY';

/**
 * Defines the constructor required by mixins
 */
export declare type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Limit the number of times a function can be called
 * per interval, timeout is in milliseconds
 */
export declare function debounce(func: Function, timeout?: number): (...args: any[]) => void;

declare type DefaultCaptionPresetConfig = {
    generatorOptions: GeneratorOptions;
};

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
export declare type Deserializer<T> = (data: any) => Promise<T> | T;

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
/**
 * This utility creates an anchor tag and clicks on it
 * @param source Blob url or base64 encoded svg
 * @param name File name suggestion
 */
export declare function downloadObject(source: string | Blob, name?: string): Promise<void>;

export declare type EasingFunction = keyof EasingFunctions;

export declare type EasingFunctions = typeof easingFunctions;

declare const easingFunctions: {
    linear: (t: number) => number;
    easeIn: (t: number) => number;
    easeOut: (t: number) => number;
    easeInOut: (t: number) => number;
};

export declare class EllipseMask extends Mask {
    private _radius;
    constructor(props: EllipseMaskProps);
}

declare interface EllipseMaskProps extends MaskProps {
    radius: {
        x: number;
        y: number;
    };
}

declare type EmittedEvent<K, T extends {}> = OverrideValues<CustomEvent<K>, {
    target: T;
}>;

export declare type EncodedOpusChunk = {
    data: Uint8Array;
    timestamp: number;
    type: 'key' | 'delta';
    duration: number;
};

export declare type EncodedOpusChunkOutputCallback = (output: EncodedOpusChunk, metadata: EncodedAudioChunkMetadata) => void;

export declare class Encoder extends WebcodecsVideoEncoder {
    private audioEncoder?;
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
    constructor(composition: Composition, init?: VideoEncoderInit_2);
    /**
     * Export the specified composition
     * @throws DOMException if the export has been aborted
     */
    render(target?: FileSystemFileHandle | string, signal?: AbortSignal): Promise<void>;
    /**
     * Check which configurations are supported and select the best
     * @returns A supported audio and video configuration
     */
    private getConfigs;
    /**
     * @deprecated please replace with `render`
     */
    export(target?: FileSystemFileHandle | string): Promise<void>;
}

export declare class EncoderError extends BaseError {
}

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
declare type EncoderEvents = {
    render: {
        /**
         * Defines how many were rendered yet
         */
        progress: number;
        /**
         * Defines the total number of frames
         * to be rendered
         */
        total: number;
        /**
         * Defines the estimated remaining
         * render time
         */
        remaining: Date;
    };
};

declare interface EncoderInit {
    /**
     * A floating point number indicating the audio context's sample rate, in samples per second.
     *
     * @default 48000
     */
    sampleRate?: number;
    /**
     * Defines the number of channels
     * of the composed audio
     *
     * @default 2
     */
    numberOfChannels?: number;
    /**
     * Defines the bitrate at which the video
     * should be rendered at
     * @default 10e6
     */
    videoBitrate?: number;
    /**
     * Defines the maximum size of the video
     * encoding queue, increasing this number
     * will put a higher pressure on the gpu.
     * It's restricted to a value between 1 and 100
     * @default 5
     */
    gpuBatchSize?: number;
    /**
     * Defines the fps at which the composition
     * will be rendered
     * @default 30
     */
    fps?: number;
    /**
     * Defines if the audio should be encoded
     */
    audio?: boolean;
}

/**
 * Error message structure
 */
export declare type ErrorEventDetail = {
    msg: string;
    code: string;
    params?: any;
};

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
export declare function EventEmitter<Events = {}>(): {
    new (...args: any[]): {
        _handlers: { [T in keyof BaseEvents<Events>]?: {
                [x: string]: (event: EmittedEvent<BaseEvents<Events>[T], any>) => void;
            } | undefined; };
        on<T_1 extends "*" | "error" | keyof Events>(eventType: T_1, callback: (event: EmittedEvent<BaseEvents<Events>[T_1], any>) => void): string;
        off(id?: string, ...ids: string[]): void;
        trigger<T_1 extends "*" | "error" | keyof Events>(eventType: T_1, detail: BaseEvents<Events>[T_1]): void;
        bubble(target: {
            _handlers: { [T in keyof BaseEvents<Events>]?: {
                    [x: string]: (event: EmittedEvent<BaseEvents<Events>[T], any>) => void;
                } | undefined; };
            on<T_1 extends "*" | "error" | keyof Events>(eventType: T_1, callback: (event: EmittedEvent<BaseEvents<Events>[T_1], any>) => void): string;
            off(id?: string, ...ids: string[]): void;
            trigger<T_1 extends "*" | "error" | keyof Events>(eventType: T_1, detail: BaseEvents<Events>[T_1]): void;
            bubble(target: any): string;
            resolve(eventType: "*" | "error" | keyof Events): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
        }): string;
        resolve(eventType: "*" | "error" | keyof Events): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
    };
};

export declare function EventEmitterMixin<Events = {}, T extends Constructor = Constructor>(Base: T): {
    new (...args: any[]): {
        _handlers: { [T_1 in keyof BaseEvents<Events>]?: {
                [x: string]: (event: EmittedEvent<BaseEvents<Events>[T_1], any>) => void;
            }; };
        on<T_1 extends keyof BaseEvents<Events>>(eventType: T_1, callback: (event: EmittedEvent<BaseEvents<Events>[T_1], any>) => void): string;
        off(id?: string, ...ids: string[]): void;
        trigger<T_1 extends keyof BaseEvents<Events>>(eventType: T_1, detail: BaseEvents<Events>[T_1]): void;
        bubble(target: any): string;
        resolve(eventType: keyof BaseEvents<Events>): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
    };
} & T;

declare type EventListener_2 = (event: MessageEvent<any>['data']) => void;

declare type Events = {
    load: undefined;
    update: undefined;
};

declare type Events_2 = {
    update: any;
    frame: number | undefined;
    attach: undefined;
    detach: undefined;
};

declare type Events_3 = {
    load: undefined;
};

declare type Events_4 = {
    update: any;
};

/**
 * @deprecated please replace with `EncoderError`
 */
export declare class ExportError extends BaseError {
}

/**
 * Fast sampler options.
 */
export declare type FastSamplerOptions = {
    /**
     * The number of samples to return.
     */
    length?: number;
    /**
     * The start time in **milliseconds** relative to the beginning of the clip.
     */
    start?: Timestamp | number;
    /**
     * The stop time in **milliseconds** relative to the beginning of the clip.
     */
    stop?: Timestamp | number;
    /**
     * Whether to use a logarithmic scale.
     */
    logarithmic?: boolean;
};

/**
 * Defines a floating point number
 */
export declare type float = (number & {
    _float: void;
}) | number;

/**
 * Converts a Float32Array to 16-bit PCM.
 */
export declare function floatTo16BitPCM(dataview: DataView, buffer: Float32Array, offset: number): DataView;

export declare class Font extends Font_base {
    /**
     * Defines if the font has been loaded yet
     */
    loaded: boolean;
    constructor(config?: types.FontSource);
    get name(): string;
    /**
     * Defines the family of the font
     * @example 'Montserrat'
     */
    family: string;
    /**
     * Defines the weight of the font
     * @example '500'
     */
    weight?: string;
    /**
     * Defines the font face source
     * @example 'url(https://mywebfont.ttf)'
     */
    source: string | undefined;
    /**
     * Defines the font style
     * @example 'italic'
     */
    style: string | undefined;
    /**
     * Load the font that has been initiated via the constructor
     */
    load(): Promise<this>;
    copy(): Font;
    /**
     * Get all available local fonts, requires the
     * **Local Font Access API**
     */
    static localFonts(): Promise<types.FontSources[]>;
    /**
     * Get common web fonts
     */
    static webFonts(): types.FontSources[];
    /**
     * Create a font by font family
     */
    static fromFamily<T extends keyof typeof WebFonts>({ family, weight, }: types.WebfontProperties<T>): Font;
}

declare const Font_base: {
    new (...args: any[]): {
        _handlers: {
            '*'?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            error?: {
                [x: string]: (event: EmittedEvent<Error, any>) => void;
            } | undefined;
            load?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
        };
        on<T extends "*" | "error" | "load">(eventType: T, callback: (event: EmittedEvent<BaseEvents<Events_3>[T], any>) => void): string;
        off(id?: string, ...ids: string[]): void;
        trigger<T extends "*" | "error" | "load">(eventType: T, detail: BaseEvents<Events_3>[T]): void;
        bubble(target: any): string;
        resolve(eventType: "*" | "error" | "load"): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
    };
} & typeof Serializer;

declare const FONT_WEIGHTS: {
    readonly '100': "Thin";
    readonly '200': "Extra Light";
    readonly '300': "Light";
    readonly '400': "Normal";
    readonly '500': "Medium";
    readonly '600': "Semi Bold";
    readonly '700': "Bold";
    readonly '800': "Extra Bold";
    readonly '900': "Black";
};

/**
 * Defines all available font families
 */
export declare type FontFamily = keyof typeof WebFonts | string;

/**
 * Defines the properties that are required
 * to load a new font
 */
export declare type FontSource = {
    /**
     * Name of the Family
     * @example 'Arial'
     */
    family: string;
    /**
     * Source of the Variant
     * @example url(arial.ttf)
     */
    source: string;
    /**
     * Defines the font style
     * @example 'italic'
     */
    style?: string;
    /**
     * The weight of the font
     * @example '400'
     */
    weight?: string;
};

/**
 * Defines a single font that has one or
 * more variants
 */
export declare type FontSources = {
    family: string;
    variants: FontSource[];
};

/**
 * Defines the style of the font
 */
export declare type FontStyle = 'normal' | 'italic' | 'oblique';

/**
 * Defines all available font subsets which
 * limit the number of characters
 */
export declare type FontSubset = 'latin' | 'latin-ext' | 'vietnamese' | 'cyrillic' | 'cyrillic-ext';

/**
 * Defines the source where the font is coming from
 */
export declare type FontType = 'local' | 'web';

/**
 * Defines all available font weights
 */
export declare type FontWeight = keyof typeof FONT_WEIGHTS;

/**
 * Defines the thickness/weight of the font
 */
export declare type fontWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
export declare const FPS_DEFAULT = 24;

/**
 * Defines an interger that correspondes
 * to a point in time
 */
export declare type frame = (number & {
    _frame: void;
}) | number;

/**
 * Convert frames to milliseconds
 */
export declare function framesToMillis(frames: frame, fps?: number): number;

/**
 * Convert frames into seconds
 */
export declare function framesToSeconds(frames: frame, fps?: number): number;

export declare type GeneratorOptions = {
    /**
     * Iterates by word count
     */
    count?: [number, number?];
    /**
     * Iterates by group duration
     */
    duration?: [number, number?];
    /**
     * Iterates by number of characters within the group
     */
    length?: [number, number?];
};

/**
 * Function for retrieving supported audio encoder configurations
 */
export declare function getAudioEncoderConfigs(settings: AudioSettings): Promise<AudioEncoderConfig[]>;

/**
 * Function for retrieving the best supported audio
 * and video profiles
 */
export declare function getSupportedEncoderConfigs(settings: {
    audio: AudioSettings;
    video: VideoSettings;
}): Promise<[VideoEncoderConfig, AudioEncoderConfig | undefined]>;

/**
 * Function for retrieving supported video encoder
 * configurations
 */
export declare function getVideoEncoderConfigs(settings: VideoSettings): Promise<VideoEncoderConfig[]>;

/**
 * Group an array of objects by the specified key
 */
export declare function groupBy<T extends {}, K extends keyof T>(arr: T[], key: K): Record<T[K], T[]>;

export declare class GuineaCaptionPreset extends Serializer implements CaptionPresetStrategy {
    readonly type: CaptionPresetType;
    colors: hex[];
    constructor(config?: Partial<MultiColorCaptionPresetConfig>);
    applyTo(track: CaptionTrack): Promise<void>;
    protected splitSequence(sequence: WordGroup): {
        segments: string[];
        words: Word[][];
    };
}

/**
 * Defines a color hex value
 */
export declare type hex = `#${string}`;

export declare class HtmlClip extends HtmlClip_base {
    readonly type = "html";
    track?: Track<HtmlClip>;
    source: HtmlSource<{}>;
    /**
     * Access to the html document that
     * will be rendered to the canvas
     */
    readonly element: HTMLImageElement;
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    /**
     * Access to the sprite containing the canvas
     */
    readonly sprite: Sprite;
    constructor(source?: File | HtmlSource, props?: HtmlClipProps);
    init(): Promise<void>;
    update(_: Timestamp): void | Promise<void>;
    copy(): HtmlClip;
}

declare const HtmlClip_base: {
    new (...args: any[]): {
        filters?: Filter | Filter[];
        _height?: int | Keyframe_2<int> | Percent | NumberCallback;
        _width?: int | Keyframe_2<int> | Percent | NumberCallback;
        _position: Position;
        _scale?: Scale;
        rotation: number | Keyframe_2<number> | NumberCallback;
        alpha: number | Keyframe_2<number> | NumberCallback;
        translate: Translate2D;
        get position(): Position;
        set position(value: Position | "center");
        get scale(): Scale;
        set scale(value: Scale | float | Keyframe_2<number> | NumberCallback);
        x: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        y: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        translateX: int | Keyframe_2<int> | NumberCallback;
        translateY: int | Keyframe_2<int> | NumberCallback;
        height: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        width: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        mask: Graphics | undefined;
        get anchor(): Anchor;
        set anchor(value: Anchor | float);
        enter(): void;
        exit(): void;
        animate(): AnimationBuilder;
        view: Container;
        id: `${string}-${string}-${string}-${string}-${string}`;
        toJSON(): any;
    };
} & {
    new (props?: ClipProps): Clip<HtmlClipProps>;
    fromJSON<T extends Serializer, K = {}>(this: new () => T, obj: K extends string ? never : K): T;
};

export declare interface HtmlClipProps extends ClipProps, VisualMixinProps {
}

export declare class HtmlSource<T extends Object = {}> extends Source<T> {
    readonly type: ClipType;
    /**
     * Access to the iframe that is required
     * for extracting the html's dimensions
     */
    readonly iframe: HTMLIFrameElement;
    constructor();
    /**
     * Access to the html document as loaded
     * within the iframe. Can be manipulated with
     * javascript
     */
    get document(): Document | undefined;
    createObjectURL(): Promise<string>;
    protected loadUrl(url: string | URL | Request, init?: RequestInit): Promise<void>;
    protected loadFile(file: File): Promise<void>;
    /**
     * Update the object url using the current
     * contents of the iframe document
     */
    update(): void;
    thumbnail(): Promise<HTMLImageElement>;
}

export declare class HtmlTrack extends Track<HtmlClip> {
    readonly type = "html";
}

export declare class ImageClip extends ImageClip_base {
    readonly type = "image";
    track?: Track<ImageClip>;
    readonly element: HTMLImageElement;
    source: ImageSource<{}>;
    /**
     * Access to the sprite containing the image texture
     */
    readonly sprite: Sprite;
    constructor(source?: File | ImageSource, props?: ImageClipProps);
    init(): Promise<void>;
    update(_: Timestamp): void | Promise<void>;
    copy(): ImageClip;
}

declare const ImageClip_base: {
    new (...args: any[]): {
        filters?: Filter | Filter[];
        _height?: int | Keyframe_2<int> | Percent | NumberCallback;
        _width?: int | Keyframe_2<int> | Percent | NumberCallback;
        _position: Position;
        _scale?: Scale;
        rotation: number | Keyframe_2<number> | NumberCallback;
        alpha: number | Keyframe_2<number> | NumberCallback;
        translate: Translate2D;
        get position(): Position;
        set position(value: Position | "center");
        get scale(): Scale;
        set scale(value: Scale | float | Keyframe_2<number> | NumberCallback);
        x: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        y: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        translateX: int | Keyframe_2<int> | NumberCallback;
        translateY: int | Keyframe_2<int> | NumberCallback;
        height: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        width: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        mask: Graphics | undefined;
        get anchor(): Anchor;
        set anchor(value: Anchor | float);
        enter(): void;
        exit(): void;
        animate(): AnimationBuilder;
        view: Container;
        id: `${string}-${string}-${string}-${string}-${string}`;
        toJSON(): any;
    };
} & {
    new (props?: ClipProps): Clip<ImageClipProps>;
    fromJSON<T extends Serializer, K = {}>(this: new () => T, obj: K extends string ? never : K): T;
};

export declare interface ImageClipProps extends ClipProps, VisualMixinProps {
}

export declare type ImageMimeType = keyof (typeof SUPPORTED_MIME_TYPES)['IMAGE'];

export declare class ImageSource<T extends Object = {}> extends Source<T> {
    readonly type: ClipType;
    thumbnail(): Promise<HTMLImageElement>;
}

declare class ImageTrack_2 extends Track<ImageClip> {
    readonly type = "image";
}
export { ImageTrack_2 as ImageTrack }

export declare type InsertMode = (typeof insertModes)[number];

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
declare const insertModes: readonly ["DEFAULT", "STACK"];

declare interface InsertStrategy<T extends InsertMode> {
    readonly mode: T;
    add(clip: Clip, track: Track<Clip>, index?: number): void;
    update(clip: Clip, track: Track<Clip>): void;
    offset(time: Timestamp, track: Track<Clip>): void;
}

/**
 * Defines a number without decimal places
 */
export declare type int = (number & {
    _int: void;
}) | number;

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
/**
 * Converts an AudioBuffer to a Float32Array.
 * For 2 channels it will result in something like:
 * [L[0], R[0], L[1], R[1], ... , L[n], R[n]]
 */
export declare function interleave(input: AudioBuffer): Float32Array;

export declare class IOError extends BaseError {
}

/**
 * Check whether a given value is a class
 */
export declare function isClass(value: any): boolean;

declare class Keyframe_2<T extends number | string> implements Omit<Serializer, 'id'> {
    /**
     * Defines the range of the input values
     * in milliseconds
     */
    input: number[];
    /**
     * Defines the range of the output values
     */
    output: T[];
    /**
     * Defines the required options that
     * control the behaviour of the keyframe
     */
    options: Required<KeyframeOptions>;
    /**
     * Constructs a Keyframe object.
     * @param inputRange - The range of input values (e.g., frame numbers).
     * @param outputRange - The range of output values (e.g., opacity, degrees, colors).
     * @param options - Additional options for extrapolation, type, and easing.
     */
    constructor(inputRange: frame[], outputRange: T[], options?: KeyframeOptions);
    /**
     * Normalizes the frame number to a value between 0 and 1 based on the input range.
     * @param frame - The current frame number.
     * @returns The normalized value.
     */
    private normalize;
    /**
     * Interpolates the output value based on the normalized frame value.
     * @param t - The normalized frame value (between 0 and 1).
     * @param segment - The current segment index.
     * @returns The interpolated output value.
     */
    private interpolate;
    /**
     * Evaluates the interpolated value for a given milliseconds number.
     * @param time - The current time in milliseconds or as a timestamp
     * @returns The interpolated output value.
     */
    value(time: number | Timestamp): T;
    /**
     * Add a new keyframe to the animation
     * @param frame time of the keyframe
     * @param value value of the keyframe
     */
    push(input: frame, output: T): this;
    toJSON(): this;
    static fromJSON<T extends number | string>(obj: ReturnType<Keyframe_2<T>['toJSON']>): Keyframe_2<T>;
}
export { Keyframe_2 as Keyframe }

/**
 * Options for configuring a Keyframe instance.
 */
export declare type KeyframeOptions = {
    /**
     * Defines the extrapolation behavior outside the input range.
     * - "clamp": Clamps the value to the nearest endpoint within the range.
     * - "extend": Allows values to extend beyond the range.
     * @default "clamp"
     */
    extrapolate?: "clamp" | "extend";
    /**
     * Specifies the type of output values.
     * - "number": Output values are numbers.
     * - "color": Output values are colors in hex format.
     * @default "number"
     */
    type?: "number" | "color";
    /**
     * An optional easing function to apply to the interpolation.
     * Easing functions can modify the interpolation to be non-linear.
     * @default "linear"
     */
    easing?: EasingFunction;
};

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
export declare enum Language {
    en = "en",
    de = "de"
}

export declare type LineCap = 'butt' | 'round' | 'square';

export declare type LineJoin = 'round' | 'bevel' | 'miter';

declare class Mask extends Graphics {
    constructor(props: MaskProps);
}

declare interface MaskProps {
    /**
     * The position of the center of the mask for circular, elliptical and star masks and
     * the top left corner of the mask for rectangular masks
     */
    position?: {
        x: number;
        y: number;
    };
}

export declare class MediaClip<Props extends MediaClipProps = MediaClipProps> extends Clip<MediaClipProps> {
    source: AudioSource<{}>;
    element?: HTMLAudioElement | HTMLVideoElement;
    _offset: Timestamp;
    /**
     * Is the media currently playing
     */
    playing: boolean;
    /**
     * The duration of the media track
     */
    readonly duration: Timestamp;
    /**
     * Trimmed start and stop values
     */
    range: [Timestamp, Timestamp];
    constructor(props?: MediaClipProps);
    /**
     * Defines the transcript of the video/audio
     */
    get transcript(): Transcript | undefined;
    set transcript(transcript: Transcript | undefined);
    get start(): Timestamp;
    get stop(): Timestamp;
    set start(time: frame | Timestamp);
    set stop(time: frame | Timestamp);
    /**
     * Offest from frame 0 of the composition
     */
    get offset(): Timestamp;
    /**
     * Change clip's offset to zero in frames. Can be negative
     */
    set offset(time: frame | Timestamp);
    /**
     * Offsets the clip by a given frame number
     */
    offsetBy(time: frame | Timestamp): this;
    /**
     * Defines if the clip is currently muted
     * @default false
     */
    get muted(): boolean;
    set muted(state: boolean);
    /**
     * Set the media playback to a given time
     */
    seek(time: Timestamp): Promise<void>;
    /**
     * Returns a slice of a media clip with trimmed start and stop
     */
    subclip(start?: frame | Timestamp, stop?: frame | Timestamp): this;
    /**
     * Number between 0 and 1 defining the volume of the media
     * @default 1;
     */
    get volume(): float;
    set volume(volume: float);
    copy(): MediaClip;
    split(time?: frame | Timestamp): Promise<this>;
    /**
     * Generates a new caption track for the current clip using the specified captioning strategy.
     * @param strategy An optional CaptionPresetStrategy to define how captions should be generated.
     */
    addCaptions(strategy?: CaptionPresetStrategy | (new () => CaptionPresetStrategy)): Promise<CaptionTrack>;
    set(props?: Props): this;
    /**
     * @deprecated use `addCaptions` instead
     */
    generateCaptions(strategy?: CaptionPresetStrategy | (new () => CaptionPresetStrategy)): Promise<CaptionTrack>;
}

export declare interface MediaClipProps extends ClipProps {
    playing?: boolean;
    transcript?: Transcript;
    offset?: frame | Timestamp;
    volume?: number;
    muted?: boolean;
}

export declare class MediaTrack<Clip extends MediaClip> extends Track<MediaClip> {
    clips: Clip[];
    seek(time: Timestamp): Promise<void>;
    /**
     * Detect periods of silence across all clips in the track
     *
     * This currently only searches for silences in each clip individually
     *
     * @returns Array of silence periods with start and stop times in seconds
     */
    removeSilences(options?: SilenceOptions): Promise<void>;
}

declare type MimeType_2 = ImageMimeType | VideoMimeType | AudioMimeType;
export { MimeType_2 as MimeType }

export declare type MixinType<T extends (...args: any[]) => {
    new (...args: any[]): any;
}> = InstanceType<ReturnType<T>>;

declare type MultiColorCaptionPresetConfig = {
    colors: hex[] | undefined;
} & DefaultCaptionPresetConfig;

/**
 * Function that will be called for each render
 * with the relative time
 */
export declare type NumberCallback = (reltime: Timestamp) => number;

export declare class OpusEncoder {
    output: EncodedOpusChunkOutputCallback;
    error: WebCodecsErrorCallback;
    config?: OpusEncoderConfig;
    private encoder?;
    private opus?;
    private meta?;
    /**
     * Create a new OpusEncoder for encoding pcm to opus
     * @param init encoder callbacks
     */
    constructor(init: OpusEncoderInit);
    /**
     * Configure the encoder. **Note** these values must match the samples to encode
     * @param config The sample rate and channel count to use
     */
    configure(config: OpusEncoderConfig): Promise<void>;
    /**
     * Encode the samples synchronously (this is a blocking event)
     * @param samples The data to encode
     */
    encode({ data, numberOfFrames, timestamp }: OpusEncoderSamples): void;
}

export declare type OpusEncoderConfig = Omit<AudioEncoderConfig, 'codec' | 'bitrate'>;

export declare type OpusEncoderInit = {
    output: EncodedOpusChunkOutputCallback;
    error: WebCodecsErrorCallback;
};

export declare type OpusEncoderSamples = {
    /**
     * 16-bit signed integer array of interleaved audio samples
     */
    data: Int16Array;
    /**
     * The number of frames (usually total samples / number of channels)
     */
    numberOfFrames: number;
    /**
     * Defines the timestamp of the first frame
     */
    timestamp?: number;
};

declare type OverrideValues<T, U> = Omit<T, keyof U> & Pick<U, Extract<keyof U, keyof T>>;

/**
 * Make sure a mimetype is valid
 * @param mimeType The mimetype to check
 * @returns A valid mimetype
 */
export declare function parseMimeType(mimeType?: string | null): MimeType_2;

/**
 * Defines a string that starts with a number
 * and ends with a `%` character
 * @example '50%'
 */
export declare type Percent = `${number}%`;

/**
 * Defines the relative coordinates
 */
export declare type Position = {
    x: int | Keyframe_2<int> | Percent | NumberCallback;
    y: int | Keyframe_2<int> | Percent | NumberCallback;
};

/**
 * Generate a random value between two numbers
 */
export declare function randInt(min: number, max: number | undefined): number;

export declare class RectangleMask extends Mask {
    private _rectangleWidth;
    private _rectangleHeight;
    constructor(props: RectangleMaskProps);
}

declare interface RectangleMaskProps extends MaskProps {
    rectangleWidth: number;
    rectangleHeight: number;
}

declare class ReferenceError_2 extends BaseError {
}
export { ReferenceError_2 as ReferenceError }

export declare type RenderSplit = {
    /**
     * Defines the index of the style object,
     * leave undefined for default styles
     */
    index?: number;
    /**
     * Defines the tokens to be rendered
     */
    tokens: string[];
};

/**
 * Change the sample rate of an audio buffer
 * @param buffer The buffer to resample
 * @param sampleRate The desired sample rate
 * @param numberOfChannels The desired number of channels
 * @returns The resampled audio buffer
 */
export declare function resampleBuffer(buffer: AudioBuffer, sampleRate?: number, numberOfChannels?: number): AudioBuffer;

export declare class RoundRectangleMask extends Graphics {
    private _rectangleWidth;
    private _rectangleHeight;
    private _borderRadius;
    constructor(props: RoundRectangleMaskProps);
}

declare interface RoundRectangleMaskProps extends RectangleMaskProps {
    borderRadius: number;
}

/**
 * Defines the x and y scaling of an object
 */
export declare type Scale = {
    x: int | Keyframe_2<int> | NumberCallback;
    y: int | Keyframe_2<int> | NumberCallback;
};

/**
 * Defines the available image formats
 */
export declare type ScreenshotImageFormat = 'webp' | 'png' | 'jpeg';

/**
 * Convert seconds into frames
 */
export declare function secondsToFrames(seconds: number, fps?: number): frame;

export declare function serializable(serializer?: Omit<Constructor<Serializer>, 'toJSON'>): (target: any, propertyKey: string) => void;

export declare class Serializer {
    /**
     * Unique identifier of the object
     */
    id: `${string}-${string}-${string}-${string}-${string}`;
    toJSON(): any;
    static fromJSON<T extends Serializer, K = {}>(this: new () => T, obj: K extends string ? never : K): T;
}

/**
 * This utility creates a file input element and clicks on it
 * @param accept comma separated mime types
 * @example audio/mp3, video/mp4
 * @param multiple enable multiselection
 * @default true
 */
export declare function showFileDialog(accept: string, multiple?: boolean): Promise<File[]>;

export declare type SilenceOptions = {
    /**
     * The threshold to use for the silence detection in db.
     */
    threshold?: number;
    /**
     * The minimum duration of a silence to be considered a silence in milliseconds.
     */
    minDuration?: number;
    /**
     * The window size to use for the silence detection.
     */
    windowSize?: number;
};

declare type SingleColorCaptionPresetConfig = {
    color: hex;
} & DefaultCaptionPresetConfig;

/**
 * Defines the absolute height and width
 */
export declare type Size = {
    width: float;
    height: float;
};

/**
 * setTimeout async/await replacement
 */
export declare function sleep(ms: number): Promise<void>;

export declare class SolarCaptionPreset extends Serializer implements CaptionPresetStrategy {
    generatorOptions: GeneratorOptions;
    readonly type: CaptionPresetType;
    constructor(config?: Partial<DefaultCaptionPresetConfig>);
    applyTo(track: CaptionTrack): Promise<void>;
}

/**
 * Config sort function that prioritizes hardware acceleration
 */
export declare function sortHardwareAcceleration(a: VideoEncoderConfig, b: VideoEncoderConfig): number;

export declare class Source<T extends Object = {}> extends Source_base {
    /**
     * Indicates if the track is loading
     */
    state: 'READY' | 'LOADING' | 'ERROR' | 'IDLE';
    /**
     * Metadata associated with the source
     */
    metadata?: T;
    /**
     * Locally accessible blob address to the data
     */
    objectURL?: string;
    /**
     * Defines the default duration
     */
    duration: Timestamp;
    /**
     * Indicates whether the source is used inside the composition
     */
    added: boolean;
    /**
     * Type of the source which is compatible
     * with clips and tracks
     */
    readonly type: ClipType;
    /**
     * Original name of the file e.g. clip.mp4
     */
    name: string;
    /**
     * Type of the file that has been loaded
     */
    mimeType: MimeType_2 | undefined;
    /**
     * External url if the file has been fetched remotely
     */
    externalURL: string | URL | Request | undefined;
    /**
     * True if the file has been retrieved from an
     * external source
     */
    external: boolean;
    /**
     * Access to the data of the source
     */
    file?: File;
    /**
     * By default this is a URL.createObjectURL proxy
     */
    createObjectURL(): Promise<string>;
    /**
     * Method for retrieving the file when
     * it has been loaded
     * @returns The loaded file
     */
    getFile(): Promise<File>;
    protected loadFile(file: File): Promise<void>;
    protected loadUrl(url: string | URL | Request, init?: RequestInit): Promise<void>;
    from(input: File | string | URL | Request, init?: RequestInit): Promise<this>;
    /**
     * Get the source as an array buffer
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Clean up the data associated with this object
     */
    remove(): Promise<void>;
    /**
     * Downloads the file
     */
    download(): Promise<void>;
    /**
     * Get a visulization of the source
     * as an html element
     */
    thumbnail(): Promise<HTMLElement>;
    /**
     * Create a new source for the specified input
     */
    static from<T extends Source>(this: new () => T, input: File | string | URL | Request, init?: RequestInit | undefined, source?: T): Promise<T>;
}

declare const Source_base: {
    new (...args: any[]): {
        _handlers: {
            '*'?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            error?: {
                [x: string]: (event: EmittedEvent<Error, any>) => void;
            } | undefined;
            load?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
            update?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
        };
        on<T_1 extends "*" | "error" | keyof Events>(eventType: T_1, callback: (event: EmittedEvent<BaseEvents<Events>[T_1], any>) => void): string;
        off(id?: string, ...ids: string[]): void;
        trigger<T_1 extends "*" | "error" | keyof Events>(eventType: T_1, detail: BaseEvents<Events>[T_1]): void;
        bubble(target: any): string;
        resolve(eventType: "*" | "error" | keyof Events): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
    };
} & typeof Serializer;

/**
 * Split an array at the specified position
 */
export declare function splitAt<T>(list: any[] | string, index: number): T;

export declare class SpotlightCaptionPreset extends Serializer implements CaptionPresetStrategy {
    generatorOptions: GeneratorOptions;
    readonly type = "SPOTLIGHT";
    color: hex;
    constructor(config?: Partial<SingleColorCaptionPresetConfig>);
    applyTo(track: CaptionTrack): Promise<void>;
}

export declare class StarMask extends Mask {
    private _numberOfPoints;
    private _radius;
    private _innerRadius;
    constructor(props: StarMaskProps);
}

declare interface StarMaskProps extends MaskProps {
    numberOfPoints: number;
    radius: number;
    innerRadius?: number;
}

export declare class StorageItem<T> extends StorageItem_base {
    private _key;
    private _value;
    private _store;
    loaded: boolean;
    constructor(store: Store, key: string, value: T | Promise<T>);
    get key(): string;
    get value(): T;
    set value(newValue: T);
    private initValue;
}

declare const StorageItem_base: {
    new (...args: any[]): {
        _handlers: {
            '*'?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            error?: {
                [x: string]: (event: EmittedEvent<Error, any>) => void;
            } | undefined;
            update?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
        };
        on<T_1 extends "*" | "error" | "update">(eventType: T_1, callback: (event: EmittedEvent<BaseEvents<Events_4>[T_1], any>) => void): string;
        off(id?: string, ...ids: string[]): void;
        trigger<T_1 extends "*" | "error" | "update">(eventType: T_1, detail: BaseEvents<Events_4>[T_1]): void;
        bubble(target: any): string;
        resolve(eventType: "*" | "error" | "update"): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
    };
} & typeof Serializer;

export declare class Store {
    readonly storageEngine: Storage;
    readonly namespace?: string;
    constructor(namespace?: string, storageEngine?: Storage);
    define<T>(key: string, defaultValue: T, deserializer?: Deserializer<T>): StorageItem<T>;
    set<T>(key: string, value: T): void;
    get<T>(key: string): T | null;
    remove(key: string): void;
    private getStorageId;
}

/**
 * Defines the stroke properties that
 * can be applied to a text
 */
export declare type Stroke = {
    /**
     * The alpha value to use for the fill.
     */
    alpha?: number;
    /**
     * The color to use for the fill.
     */
    color?: hex;
    /**
     * The width of the stroke.
     */
    width?: number;
    /**
     * The line join style to use.
     */
    join?: LineJoin;
    /**
     * The miter limit to use.
     */
    miterLimit?: number;
};

export declare type StyleOption = {
    fillStyle?: string;
    fontSize?: number;
    stroke?: Stroke;
    font?: Font;
};

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
export declare const SUPPORTED_MIME_TYPES: {
    IMAGE: {
        'image/jpeg': string;
        'image/png': string;
        'image/webp': string;
        'image/svg+xml': string;
    };
    VIDEO: {
        'video/mp4': string;
        'video/webm': string;
        'video/quicktime': string;
    };
    AUDIO: {
        'audio/mp3': string;
        'audio/mpeg': string;
        'audio/aac': string;
        'audio/wav': string;
        'audio/x-wav': string;
    };
    DOCUMENT: {
        'text/html': string;
    };
    readonly MIXED: {
        'text/html': string;
        'audio/mp3': string;
        'audio/mpeg': string;
        'audio/aac': string;
        'audio/wav': string;
        'audio/x-wav': string;
        'video/mp4': string;
        'video/webm': string;
        'video/quicktime': string;
        'image/jpeg': string;
        'image/png': string;
        'image/webp': string;
        'image/svg+xml': string;
    };
};

/**
 * Defines the vertical alignment of the text.
 * This key also sets the anchor point.
 */
export declare type TextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Defines the horizonal alignment of the text.
 * This key also sets the anchor point.
 */
export declare type TextBaseline = 'alphabetic' | 'top' | 'hanging' | 'middle' | 'ideographic' | 'bottom';

/**
 * Defines the text casing
 */
export declare type TextCase = 'upper' | 'lower';

export declare class TextClip<Props extends TextClipProps = TextClipProps> extends TextClip_base {
    readonly type: 'text' | 'complex_text';
    track?: Track<TextClip>;
    protected _text: string;
    protected _textCase: types_2.TextCase | undefined;
    protected _anchor: Anchor;
    protected _font: Font;
    readonly style: TextStyle;
    constructor(props?: string | TextClipProps);
    /**
     * Set the copy for the text object. To split a line you can use '\n'.
     */
    get text(): string | undefined;
    set text(value: string);
    get name(): string;
    get font(): Font;
    set font(value: Font);
    /**
     * The width at which text will wrap
     */
    get maxWidth(): number | undefined;
    set maxWidth(value: number | undefined);
    /**
     * Alignment for multiline text, does not affect single line text.
     */
    get textAlign(): types_2.TextAlign;
    set textAlign(value: types_2.TextAlign);
    get padding(): number;
    set padding(value: number);
    /**
     * The baseline of the text that is rendered.
     */
    get textBaseline(): types_2.TextBaseline;
    set textBaseline(value: types_2.TextBaseline);
    /**
     * A fillstyle that will be used on the text '#00FF00'.
     */
    get fillStyle(): hex;
    set fillStyle(value: hex);
    get anchor(): Anchor;
    set anchor(value: Anchor | float);
    /**
     * An object describing the stroke to apply
     */
    get stroke(): types_2.Stroke | undefined;
    set stroke(value: Partial<types_2.Stroke> | undefined);
    /**
     * The casing of the text, e.g. uppercase
     */
    get textCase(): types_2.TextCase | undefined;
    set textCase(value: types_2.TextCase | undefined);
    /**
     * Set a drop shadow for the text.
     */
    get shadow(): types_2.TextShadow | undefined;
    set shadow(value: Partial<types_2.TextShadow> | undefined);
    /**
     * The font family, can be a single font name, or a list of names where the first is the preferred font.
     */
    get fontFamily(): string;
    /**
     * The font size (as a number it converts to px, but as a string, equivalents are '26px','20pt','160%' or '1.6em')
     */
    get fontSize(): number;
    set fontSize(value: number);
    /**
     * The space between lines
     */
    get leading(): number;
    set leading(value: number);
    update(_: Timestamp): void | Promise<void>;
    copy(): TextClip;
    protected get transformedText(): string;
    protected reflectUpdate(): void;
    set(props?: Props): this;
}

declare const TextClip_base: {
    new (...args: any[]): {
        filters?: Filter | Filter[];
        _height?: int | Keyframe_2<int> | Percent | NumberCallback;
        _width?: int | Keyframe_2<int> | Percent | NumberCallback;
        _position: Position;
        _scale?: Scale;
        rotation: number | Keyframe_2<number> | NumberCallback;
        alpha: number | Keyframe_2<number> | NumberCallback;
        translate: Translate2D;
        get position(): Position;
        set position(value: Position | "center");
        get scale(): Scale;
        set scale(value: Scale | float | Keyframe_2<number> | NumberCallback);
        x: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        y: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        translateX: int | Keyframe_2<int> | NumberCallback;
        translateY: int | Keyframe_2<int> | NumberCallback;
        height: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        width: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        mask: Graphics | undefined;
        get anchor(): Anchor;
        set anchor(value: Anchor | float);
        enter(): void;
        exit(): void;
        animate(): AnimationBuilder;
        view: Container;
        id: `${string}-${string}-${string}-${string}-${string}`;
        toJSON(): any;
    };
} & {
    new (props?: ClipProps): Clip<TextClipProps>;
    fromJSON<T extends Serializer, K = {}>(this: new () => T, obj: K extends string ? never : K): T;
};

export declare interface TextClipProps extends ClipProps, Omit<VisualMixinProps, 'anchor'> {
    text?: string;
    font?: Font;
    maxWidth?: number;
    textAlign?: TextAlign;
    padding?: number;
    textBaseline?: TextBaseline;
    fillStyle?: hex;
    stroke?: Partial<Stroke>;
    textCase?: TextCase;
    shadow?: Partial<TextShadow>;
    fontSize?: number;
    leading?: number;
}

declare class TextMetricLine {
    tokens: {
        metrics: CanvasTextMetrics;
        index: number;
    }[];
    get width(): number;
    get height(): number;
}

declare class TextMetrics_2 {
    lines: TextMetricLine[];
    get width(): number;
    get height(): number;
}

export declare type TextSegment = {
    /**
     * Defines the index of the style object,
     * leave undefined for default styles
     */
    index?: number;
    /**
     * Defines the start of the style segment
     */
    start: number;
    /**
     * Defines the stop of the style segment, leave
     * undefined when it's the end of the text
     */
    stop?: number;
};

/**
 * Defines the text shadow
 */
export declare type TextShadow = {
    /** Set alpha for the drop shadow  */
    alpha: number;
    /** Set a angle of the drop shadow */
    angle: number;
    /** Set a shadow blur radius */
    blur: number;
    /** A fill style to be used on the  e.g., '#00FF00' */
    color: hex;
    /** Set a distance of the drop shadow */
    distance: number;
};

declare class TextTrack_2 extends Track<TextClip> {
    readonly type = "text";
}
export { TextTrack_2 as TextTrack }

export declare class Thread<Result> {
    worker: Worker;
    constructor(Worker: Constructor<Worker>);
    run<Arg>(payload?: Arg, listner?: EventListener_2): Promise<TreadResponse<Result>>;
}

/**
 * Defines a time indication object that uses
 * milliseconds rounded to the nearest integer
 * and 30fps internally. By default the time is 0
 */
export declare class Timestamp implements Omit<Serializer, 'id'> {
    /**
     * Time state in **milliseconds**
     */
    private time;
    /**
     * Create a new timestamp from **milliseconds**
     */
    constructor(milliseconds?: number);
    /**
     * Base unit of the timestamp
     */
    get millis(): number;
    set millis(value: number);
    /**
     * Defines the time in frames at the
     * current frame rate
     */
    get frames(): frame;
    set frames(value: frame);
    /**
     * Convert the timestamp to seconds
     */
    get seconds(): number;
    set seconds(value: number);
    /**
     * Equivalent to millis += x
     */
    addMillis(value: number): this;
    /**
     * Equivalent to frames += x
     */
    addFrames(value: frame): this;
    /**
     * add two timestamps the timestamp being added will adapt
     * its fps to the current fps
     * @returns A new Timestamp instance with the added frames
     */
    add(time: Timestamp): Timestamp;
    /**
     * subtract two timestamps timestamp being subtracted
     * will adapt its fps to the current fps
     * @returns A new Timestamp instance with the added frames
     */
    subtract(time: Timestamp): Timestamp;
    /**
     * Create a new timestamp from seconds
     */
    static fromSeconds(value: number): Timestamp;
    /**
     * Create a new timestamp from frames
     */
    static fromFrames(value: frame, fps?: number): Timestamp;
    /**
     * get a copy of the object
     */
    copy(): Timestamp;
    toJSON(): number;
    static fromJSON(value: number): Timestamp;
}

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
/**
 * Convert an alpha value to hex
 * @param alpha A value between 0 and 1
 * @returns Alpha as 2 digit hex
 * @example FF
 */
export declare function toHex(alpha: number): string;

export declare class Track<Clp extends Clip> extends Track_base {
    private _disabled;
    view: Container<ContainerChild>;
    /**
     * The clips to be displayed
     */
    clips: Clp[];
    /**
     * Pointer to the expected track
     */
    pointer: number;
    /**
     * Reference to the composition
     */
    composition?: Composition;
    /**
     * Id that can be used to search by kind
     */
    readonly type: TrackType;
    /**
     * Controls how the clips should be inserted and updated
     */
    strategy: InsertStrategy<InsertMode>;
    /**
     * Controls the visability of the track
     */
    get disabled(): boolean;
    set disabled(value: boolean);
    /**
     * Connect the track with the composition
     */
    connect(composition: Composition): void;
    /**
     * Applies the stack property
     */
    stacked(value?: boolean): this;
    /**
     * Change the layer of the track
     */
    layer(layer: TrackLayer): this;
    /**
     * Seek the provided time if the track contains
     * audio or video clips
     */
    seek(time: Timestamp): void;
    /**
     * Move all clips of the track at once along the timeline
     */
    offsetBy(time: frame | Timestamp): this;
    /**
     * Triggered when the track is redrawn
     */
    update(time: Timestamp): void | Promise<void>;
    /**
     * Adds a new clip to the track
     * @param clip The clip to add
     * @param index The index to insert the clip at, will be ignored if track is not stacked
     * @throws Error if the clip can't be added
     */
    add(clip: Clp, index?: number): Promise<Clp>;
    /**
     * Remove a given clip from the track
     * @returns `Track` when it has been successfully removed `undefined` otherwise
     */
    remove<L extends Clp>(clip: L): L | undefined;
    /**
     * Get the first visible frame of the clip
     */
    get stop(): Timestamp;
    /**
     * Get the last visible frame of the clip
     */
    get start(): Timestamp;
    /**
     * apply a function to all clips within the track
     */
    apply(fn: (value: Clp) => void): void;
    /**
     * Remove the track from the composition
     */
    detach(): this;
    /**
     * Get the clip that the pointer is
     * currently referencing
     */
    private get clipRef();
}

declare const Track_base: {
    new (...args: any[]): {
        _handlers: {
            '*'?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            error?: {
                [x: string]: (event: EmittedEvent<Error, any>) => void;
            } | undefined;
            update?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            frame?: {
                [x: string]: (event: EmittedEvent<number | undefined, any>) => void;
            } | undefined;
            attach?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
            detach?: {
                [x: string]: (event: EmittedEvent<undefined, any>) => void;
            } | undefined;
        };
        on<T extends "*" | "error" | keyof Events_2>(eventType: T, callback: (event: EmittedEvent<BaseEvents<Events_2>[T], any>) => void): string;
        off(id?: string, ...ids: string[]): void;
        trigger<T extends "*" | "error" | keyof Events_2>(eventType: T, detail: BaseEvents<Events_2>[T]): void;
        bubble(target: any): string;
        resolve(eventType: "*" | "error" | keyof Events_2): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
    };
} & typeof Serializer;

export declare class TrackDeserializer {
    static fromType<T extends keyof TrackMap>(data: {
        type: T;
    }): TrackMap[T];
}

export declare type TrackInsertMethod = 'STACK' | 'TIMED';

/**
 * Defines where the track should be inserted
 */
export declare type TrackLayer = 'top' | 'bottom' | number;

export declare type TrackMap = {
    video: VideoTrack;
    audio: AudioTrack;
    html: HtmlTrack;
    image: ImageTrack_2;
    text: TextTrack_2;
    complex_text: TextTrack_2;
    caption: CaptionTrack;
    base: Track<Clip>;
};

export declare type TrackType = keyof TrackMap;

export declare class Transcript implements Serializer {
    id: `${string}-${string}-${string}-${string}-${string}`;
    language: Language;
    groups: WordGroup[];
    get text(): string;
    get words(): Word[];
    constructor(groups?: WordGroup[], language?: Language);
    /**
     * Iterate over all words in groups
     */
    iter({ count, duration, length }: GeneratorOptions): Generator<WordGroup, void, unknown>;
    /**
     * This method will optimize the transcipt for display
     */
    optimize(): this;
    /**
     * Convert the transcript into a SRT compatible
     * string and downloadable blob
     */
    toSRT(options?: GeneratorOptions): {
        text: string;
        blob: Blob;
    };
    toJSON(): Captions;
    /**
     * Create a new Transcript containing the
     * first `{count}` words
     * @param count Defines the number of words required
     * @param startAtZero Defines if the first word should start at 0 milliseconds
     * @returns A new Transcript instance
     */
    slice(count: number, startAtZero?: boolean): Transcript;
    static fromJSON(data: Captions): Transcript;
    /**
     * Fetch captions from an external resource and parse them. JSON needs
     * to be of the form `{ token: string; start: number; stop: number; }[][]`
     * @param url Location of the captions
     * @param init Additional fetch parameters such as method or headers
     * @returns A Transcript with processed captions
     */
    static from(url: string | URL | Request, init?: RequestInit | undefined): Promise<Transcript>;
}

/**
 * Defines the x and y coorinates of
 * a 2D offset relative to the postion
 */
export declare type Translate2D = {
    x: int | Keyframe_2<int> | NumberCallback;
    y: int | Keyframe_2<int> | NumberCallback;
};

declare type TreadResponse<R> = {
    result: R;
    error: undefined;
} | {
    result: undefined;
    error: string;
};

declare namespace types {
    export {
        FontFamily,
        FontWeight,
        FontStyle,
        FontSubset,
        FontType,
        FontSource,
        FontSources,
        WebfontProperties
    }
}

declare namespace types_2 {
    export {
        TextAlign,
        TextBaseline,
        LineCap,
        LineJoin,
        Stroke,
        TextCase,
        TextShadow,
        fontWeight,
        TextSegment,
        RenderSplit,
        StyleOption,
        Background
    }
}

/**
 * Short unique id (not as secure as uuid 4 though)
 */
export declare function uid(): string | undefined;

/**
 * Defines a uuid 4
 */
export declare type uuid = `${string}-${string}-${string}-${string}-${string}`;

export declare class ValidationError extends BaseError {
}

export declare class VerdantCaptionPreset extends Serializer implements CaptionPresetStrategy {
    readonly type: CaptionPresetType;
    generatorOptions: GeneratorOptions;
    color: hex;
    constructor(config?: Partial<SingleColorCaptionPresetConfig>);
    applyTo(track: CaptionTrack): Promise<void>;
}

export declare class VideoClip extends VideoClip_base {
    source: VideoSource<{}>;
    readonly type = "video";
    track?: Track<VideoClip>;
    private worker?;
    private buffer?;
    private readonly canvas;
    private readonly context;
    /**
     * Html5 video element access
     */
    readonly element: HTMLVideoElement;
    /**
     * Html5 and canvas video textures
     */
    readonly textrues: {
        html5: Texture;
        canvas: Texture;
    };
    /**
     * Access to the sprite containing the video
     */
    readonly sprite: Sprite;
    constructor(source?: File | VideoSource, props?: VideoClipProps);
    init(): Promise<void>;
    connect(track: Track<VideoClip>): Promise<void>;
    enter(): void;
    update(_: Timestamp): void | Promise<void>;
    exit(): void;
    copy(): VideoClip;
    private decodeVideo;
    private nextFrame;
    private get demuxRange();
    /**
     * Cancel decoding
     */
    cancelDecoding(): void;
}

declare const VideoClip_base: {
    new (...args: any[]): {
        filters?: Filter | Filter[];
        _height?: int | Keyframe_2<int> | Percent | NumberCallback;
        _width?: int | Keyframe_2<int> | Percent | NumberCallback;
        _position: Position;
        _scale?: Scale;
        rotation: number | Keyframe_2<number> | NumberCallback;
        alpha: number | Keyframe_2<number> | NumberCallback;
        translate: Translate2D;
        get position(): Position;
        set position(value: Position | "center");
        get scale(): Scale;
        set scale(value: Scale | float | Keyframe_2<number> | NumberCallback);
        x: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        y: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        translateX: int | Keyframe_2<int> | NumberCallback;
        translateY: int | Keyframe_2<int> | NumberCallback;
        height: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        width: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        mask: Graphics | undefined;
        get anchor(): Anchor;
        set anchor(value: Anchor | float);
        enter(): void;
        exit(): void;
        animate(): AnimationBuilder;
        view: Container;
        id: `${string}-${string}-${string}-${string}-${string}`;
        toJSON(): any;
    };
} & {
    new (props?: MediaClipProps): MediaClip<VideoClipProps>;
    fromJSON<T extends Serializer, K = {}>(this: new () => T, obj: K extends string ? never : K): T;
};

export declare interface VideoClipProps extends MediaClipProps, VisualMixinProps {
}

declare interface VideoEncoderInit_2 extends EncoderInit {
    /**
     * Multiplier of the composition size
     * @example 2 // 1080p -> 4K
     * @default 1 // 1080p -> 1080p
     */
    resolution?: number;
    /**
     * Defines if the performance should be logged
     * @default false;
     */
    debug?: boolean;
}

export declare type VideoMimeType = keyof (typeof SUPPORTED_MIME_TYPES)['VIDEO'];

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
declare type VideoSettings = {
    height: number;
    width: number;
    fps: number;
    bitrate: number;
};

export declare class VideoSource<T extends Object = {}> extends AudioSource<T> {
    readonly type: ClipType;
    private downloadInProgress;
    protected loadUrl(url: string | URL | Request, init?: RequestInit | undefined): Promise<void>;
    getFile(): Promise<File>;
    thumbnail(): Promise<HTMLVideoElement>;
    private getBlob;
}

export declare class VideoTrack extends MediaTrack<VideoClip> {
    readonly type = "video";
    seek(time: Timestamp): Promise<void>;
}

/**
 * Defines the visual render decorator
 */
export declare function visualize<T extends MixinType<typeof VisualMixin> & Clip>(target: T, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor;

export declare function VisualMixin<T extends Constructor<BaseClass>>(Base: T): {
    new (...args: any[]): {
        /**
         * Apply one or more `Pixi.js` filters to the clip.
         * @example
         * clip.filters = [new BlurFilter()];
         */
        filters?: Filter | Filter[];
        _height?: int | Keyframe_2<int> | Percent | NumberCallback;
        _width?: int | Keyframe_2<int> | Percent | NumberCallback;
        _position: Position;
        _scale?: Scale;
        /**
         * Defines the rotation of the clip in degrees
         * @default 0
         * @example 90
         */
        rotation: number | Keyframe_2<number> | NumberCallback;
        /**
         * Defines the opacity of the clip as a number
         * between 0 and 1
         * @default 1
         */
        alpha: number | Keyframe_2<number> | NumberCallback;
        /**
         * 2D position offset of the clip.
         * @default { x: 0, y: 0 }
         */
        translate: Translate2D;
        /**
         * The coordinate of the object relative to the local coordinates of the parent.
         * @default { x: 0, y: 0 }
         */
        get position(): Position;
        set position(value: Position | "center");
        /**
         * The scale factors of this object along the local coordinate axes.
         * Will be added to the scale applied by setting height and/or width
         * @default { x: 1, y: 1 }
         */
        get scale(): Scale;
        set scale(value: Scale | float | Keyframe_2<number> | NumberCallback);
        /**
         * The position of the clip on the x axis relative.
         * An alias to position.x
         * @default 0
         */
        x: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        /**
         * The position of the clip on the y axis. An alias to position.y
         * @default 0
         */
        y: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        /**
         * Offset relative to the x position
         * @default 0
         */
        translateX: int | Keyframe_2<int> | NumberCallback;
        /**
         * Offset relative to the y position
         * @default 0
         */
        translateY: int | Keyframe_2<int> | NumberCallback;
        /**
         * The height of the clip/container
         */
        height: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        /**
         * The width of the clip/container
         */
        width: int | `${number}%` | Keyframe_2<int> | NumberCallback;
        /**
         * The mask to apply to the clip
         */
        mask: Graphics | undefined;
        /**
         * The anchor sets the origin point of the clip. Setting the anchor to (0.5,0.5)
         * means the clips' origin is centered. Setting the anchor to (1,1) would mean
         * the clips' origin point will be the bottom right corner. If you pass only
         * single parameter, it will set both x and y to the same value.
         */
        get anchor(): Anchor;
        set anchor(value: Anchor | float);
        enter(): void;
        exit(): void;
        animate(): AnimationBuilder;
        view: Container;
        id: `${string}-${string}-${string}-${string}-${string}`;
        toJSON(): any;
    };
} & T;

export declare interface VisualMixinProps {
    filters?: Filter | Filter[];
    rotation?: number | Keyframe_2<number> | NumberCallback;
    alpha?: number | Keyframe_2<number> | NumberCallback;
    translate?: Translate2D;
    position?: Position | 'center';
    scale?: Scale | float | Keyframe_2<number> | NumberCallback;
    x?: int | Keyframe_2<int> | Percent | NumberCallback;
    y?: int | Keyframe_2<int> | Percent | NumberCallback;
    translateX?: int | Keyframe_2<int> | NumberCallback;
    translateY?: int | Keyframe_2<int> | NumberCallback;
    height?: Keyframe_2<int> | Percent | int | NumberCallback;
    width?: Keyframe_2<int> | Percent | int | NumberCallback;
    anchor?: Anchor | float;
}

/**
 * @deprecated Please use the `Encoder` object instead
 */
export declare class WebcodecsEncoder extends Encoder {
}

declare class WebcodecsVideoEncoder extends WebcodecsVideoEncoder_base implements Required<VideoEncoderInit_2> {
    composition: Composition;
    resolution: number;
    sampleRate: number;
    numberOfChannels: number;
    videoBitrate: number;
    gpuBatchSize: number;
    fps: number;
    debug: boolean;
    audio: boolean;
    constructor(composition: Composition, init?: VideoEncoderInit_2);
    /**
     * render and encode visual frames
     */
    encodeVideo(muxer: Muxer<StreamTarget>, config: VideoEncoderConfig, signal?: AbortSignal): Promise<void>;
}

declare const WebcodecsVideoEncoder_base: {
    new (...args: any[]): {
        _handlers: {
            '*'?: {
                [x: string]: (event: EmittedEvent<any, any>) => void;
            } | undefined;
            error?: {
                [x: string]: (event: EmittedEvent<Error, any>) => void;
            } | undefined;
            render?: {
                [x: string]: (event: EmittedEvent<    {
                progress: number;
                total: number;
                remaining: Date;
                }, any>) => void;
            } | undefined;
        };
        on<T extends "*" | "error" | "render">(eventType: T, callback: (event: EmittedEvent<BaseEvents<EncoderEvents>[T], any>) => void): string;
        off(id?: string, ...ids: string[]): void;
        trigger<T extends "*" | "error" | "render">(eventType: T, detail: BaseEvents<EncoderEvents>[T]): void;
        bubble(target: {
            _handlers: {
                '*'?: {
                    [x: string]: (event: EmittedEvent<any, any>) => void;
                } | undefined;
                error?: {
                    [x: string]: (event: EmittedEvent<Error, any>) => void;
                } | undefined;
                render?: {
                    [x: string]: (event: EmittedEvent<    {
                    progress: number;
                    total: number;
                    remaining: Date;
                    }, any>) => void;
                } | undefined;
            };
            on<T extends "*" | "error" | "render">(eventType: T, callback: (event: EmittedEvent<BaseEvents<EncoderEvents>[T], any>) => void): string;
            off(id?: string, ...ids: string[]): void;
            trigger<T extends "*" | "error" | "render">(eventType: T, detail: BaseEvents<EncoderEvents>[T]): void;
            bubble(target: any): string;
            resolve(eventType: "*" | "error" | "render"): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
        }): string;
        resolve(eventType: "*" | "error" | "render"): (resolve: (value: unknown) => void, reject: (reason?: any) => void) => void;
    };
};

/**
 * Defines the arguments to identify
 * a default webfont
 */
export declare type WebfontProperties<T extends keyof typeof WebFonts> = {
    family: T;
    weight: typeof WebFonts[T]['weights'][number];
};

/**
 * Copyright (c) 2024 The Diffusion Studio Authors
 *
 * This Source Code Form is subject to the terms of the Mozilla
 * Public License, v. 2.0 that can be found in the LICENSE file.
 */
export declare const WebFonts: {
    readonly 'The Bold Font': {
        readonly weights: readonly ["500"];
        readonly url: "https://diffusion-studio-public.s3.eu-central-1.amazonaws.com/fonts/the-bold-font.ttf";
    };
    readonly 'Komika Axis': {
        readonly weights: readonly ["400"];
        readonly url: "https://diffusion-studio-public.s3.eu-central-1.amazonaws.com/fonts/komika-axis.ttf";
    };
    readonly Geologica: {
        readonly weights: readonly ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
        readonly url: "https://fonts.gstatic.com/s/geologica/v1/oY1l8evIr7j9P3TN9YwNAdyjzUyDKkKdAGOJh1UlCDUIhAIdhCZOn1fLsig7jfvCCPHZckUWE1lELWNN-w.woff2";
    };
    readonly Figtree: {
        readonly weights: readonly ["300", "400", "500", "600", "700", "800", "900"];
        readonly url: "https://fonts.gstatic.com/s/figtree/v5/_Xms-HUzqDCFdgfMm4S9DaRvzig.woff2";
    };
    readonly Urbanist: {
        readonly weights: readonly ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
        readonly url: "https://fonts.gstatic.com/s/urbanist/v15/L0x-DF02iFML4hGCyMqlbS1miXK2.woff2";
    };
    readonly Montserrat: {
        readonly weights: readonly ["100", "200", "300", "400", "500", "600", "700", "800", "900"];
        readonly url: "https://fonts.gstatic.com/s/montserrat/v26/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2";
    };
    readonly Bangers: {
        readonly weights: readonly ["400"];
        readonly url: "https://fonts.gstatic.com/s/bangers/v20/FeVQS0BTqb0h60ACH55Q2J5hm24.woff2";
    };
    readonly Chewy: {
        readonly weights: readonly ["400"];
        readonly url: "https://fonts.gstatic.com/s/chewy/v18/uK_94ruUb-k-wn52KjI9OPec.woff2";
    };
    readonly 'Source Code Pro': {
        readonly weights: readonly ["200", "300", "400", "500", "600", "700", "800", "900"];
        readonly url: "https://fonts.gstatic.com/s/sourcecodepro/v22/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevWnsUnxg.woff2";
    };
};

export declare class WhisperCaptionPreset extends Serializer implements CaptionPresetStrategy {
    generatorOptions: GeneratorOptions;
    readonly type = "WHISPER";
    color: hex;
    constructor(config?: Partial<SingleColorCaptionPresetConfig>);
    applyTo(track: CaptionTrack): Promise<void>;
}

export declare function withThreadErrorHandler(main: (event: MessageEvent<any>) => Promise<void>): (event: MessageEvent<any>) => Promise<void>;

export declare class Word {
    /**
     * Defines the text to be displayed
     */
    text: string;
    /**
     * Defines the time stamp at
     * which the text is spoken
     */
    start: Timestamp;
    /**
     * Defines the time stamp at
     * which the text was spoken
     */
    stop: Timestamp;
    /**
     * Defines the confidence of
     * the predicition
     */
    confidence?: number;
    /**
     * Create a new Word object
     * @param text The string contents of the word
     * @param start Start in **milliseconds**
     * @param stop Stop in **milliseconds**
     * @param confidence Predicition confidence
     */
    constructor(text: string, start: number, stop: number, confidence?: number);
    /**
     * Defines the time between start
     * and stop returned as a timestamp
     */
    get duration(): Timestamp;
}

export declare class WordGroup {
    words: Word[];
    constructor(words?: Word[]);
    get duration(): Timestamp;
    get text(): string;
    get start(): Timestamp;
    get stop(): Timestamp;
}

export { }
