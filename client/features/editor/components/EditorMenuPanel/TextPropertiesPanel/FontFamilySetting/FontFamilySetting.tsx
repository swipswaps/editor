import Konva from 'konva';
import React from 'react';
import DropdownSelect from '../../../../../../components/ui/DropdownSelect/DropdownSelect';
import DropdownSelectOption from '../../../../../../components/ui/DropdownSelect/DropdownSelectOption';
import useDropdown from '../../../../../../components/ui/Dropdown/useDropdown';
import { ALL_FONTS } from '../../../../constants';
import { EditorContainer } from '../../../../containers/EditorContainer/EditorContainer';
import SideMenuSetting from '../../../ui/SideMenuSetting';
import FontFamilySelectAnchor from './FontFamilySelectAnchor';

interface Props {
  elementId: string;
  elementProps: Konva.TextConfig;
}

function FontFamilySetting({ elementId, elementProps }: Props) {
  const { dispatch } = EditorContainer.useContainer();
  const { setTargetElement, targetElement } = useDropdown();

  const handleChangeOption = (fontFamily?: string) => {
    dispatch({ type: 'update_element', id: elementId, props: { fontFamily } });
  };

  return (
    <SideMenuSetting label="Font family">
      <div ref={setTargetElement}>
        <DropdownSelect
          placement="bottom"
          value={elementProps.fontFamily}
          wrapperClass="w-68"
          onChange={handleChangeOption}
          targetElement={targetElement}
          target={({ open }) => (
            <FontFamilySelectAnchor open={open}>
              <span
                style={{ fontFamily: elementProps.fontFamily }}
                className="leading-5"
              >
                {elementProps.fontFamily}
              </span>
            </FontFamilySelectAnchor>
          )}
        >
          {ALL_FONTS.map((fontFamily) => (
            <DropdownSelectOption
              key={fontFamily}
              value={fontFamily}
              style={{ fontFamily }}
            >
              <span className="text-base">{fontFamily}</span>
            </DropdownSelectOption>
          ))}
        </DropdownSelect>
      </div>
    </SideMenuSetting>
  );
}

export default FontFamilySetting;
