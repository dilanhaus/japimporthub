export type StageLifecycleProps = {
  onContentReady?: () => void;
  onSequenceComplete?: () => void;
  /** Stage 6: begin near-black loop fade before restart */
  onLoopFadeStart?: () => void;
};
