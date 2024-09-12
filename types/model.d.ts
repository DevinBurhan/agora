/// <reference types="@google/model-viewer" />

export declare global {
  namespace JSX {
    // interface IntrinsicElements {
    //   'model-viewer': React.DetailedHTMLProps<
    //     React.AllHTMLAttributes<Partial<globalThis.HTMLElementTagNameMap['model-viewer']>>,
    //     Partial<globalThis.HTMLElementTagNameMap['model-viewer']>
    //   >;
    // }

    interface IntrinsicElements {
      'model-viewer': MyElementAttributes;
    }

    interface MyElementAttributes {
      id: string;
      src: string;
      poster?: string;
      iosSrc?: string;
      seamlessPoster?: boolean;
      autoplay?: boolean;
      environmentImage?: string;
      exposure?: string;
      interactionPromptThreshold?: string;
      shadowIntensity?: string;
      ar?: boolean;
      arModes?: string;
      autoRotate?: boolean;
      cameraControls?: boolean;
      alt?: string;
      sx?: any;
      style: any;
      children: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
