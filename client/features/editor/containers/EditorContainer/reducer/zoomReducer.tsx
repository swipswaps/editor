import { EditorState } from '../../../interfaces';
import { Template } from '../../../interfaces/StageConfig';

export type ZoomAction =
  | { type: 'zoom'; zoom: number }
  | {
      type: 'load_template';
      template: Template;
      screenDimensions: { width: number; height: number };
    }
  | {
      type: 'fit_to_screen';
      screenDimensions: { width: number; height: number };
      canvasDimensions?: { width: number; height: number };
    }
  | {
      type: 'fill_screen';
      screenDimensions: { width: number; height: number };
      canvasDimensions?: { width: number; height: number };
    };

export default function reducer(
  state: EditorState,
  action: ZoomAction
): EditorState {
  const { height, width } = state.template.present.dimensions;

  switch (action.type) {
    case 'zoom':
      return {
        ...state,
        zoom: action.zoom,
      };
    case 'load_template': {
      const canvasHeight = action.template.dimensions.height;
      const canvasWidth = action.template.dimensions.width;
      return {
        ...state,
        zoom: Math.min(
          action.screenDimensions.height / canvasHeight,
          action.screenDimensions.width / canvasWidth
        ),
      };
    }
    case 'fit_to_screen': {
      const canvasHeight = action.canvasDimensions?.height ?? height;
      const canvasWidth = action.canvasDimensions?.width ?? width;
      return {
        ...state,
        zoom: Math.min(
          action.screenDimensions.height / canvasHeight,
          action.screenDimensions.width / canvasWidth
        ),
      };
    }
    case 'fill_screen': {
      const canvasHeight = action.canvasDimensions?.height ?? height;
      const canvasWidth = action.canvasDimensions?.width ?? width;
      return {
        ...state,
        zoom: Math.max(
          action.screenDimensions.height / canvasHeight,
          action.screenDimensions.width / canvasWidth
        ),
      };
    }
    default:
      return state;
  }
}
