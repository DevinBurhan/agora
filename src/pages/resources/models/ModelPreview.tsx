import '@google/model-viewer/lib/model-viewer';

import './style.css';

import imgSrc from '@/assets/images/helthcare/dna-molecules.jpg';

export type ModelPreviewProps = {
  glbSrc: string;
  iosSrc?: string;
  alt?: string;
};
function ModelPreview({ glbSrc, iosSrc, alt }: ModelPreviewProps) {
  return (
    <div className="modelContainer w-fit border-2 border-[#9b9b9b2b] p-3">
      <model-viewer
        id="3d_model_preview"
        src={glbSrc}
        ios-src={iosSrc}
        seamless-poster
        environment-image="neutral"
        exposure="1.0"
        interaction-prompt-threshold="0"
        shadow-intensity="1"
        ar
        autoplay
        ar-modes="webxr scene-viewer quick-look"
        auto-rotate
        camera-controls
        alt={alt}
        style={{ height: '250px' }}
      >
        <div className="poster" slot="poster">
          <img className="pre-prompt" src={imgSrc} alt={alt} style={{ height: '250px' }} />
        </div>
      </model-viewer>
    </div>
  );
}

export default ModelPreview;
