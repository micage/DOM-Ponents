import { Div, P, Img } from "../DOM/Elements";
import Code from "../DOM/Code";
import LabeledValueSliderV from "../DOM/LabeledValueSliderV";

// styles
import styles from "./VSliderDemo.less"

const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        P({ innerText: 'Frequencies Example' }),
        P({ innerText: 'Some vertical slider components. Useful for e.g. keyframe animation or audio filtering' }),
        P({ children: [
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 1', min: 1.0, max: 2.0, val: 1.1, units: 'MHz' }),
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 2', min: 2.0, max: 3.0, val: 2.6, units: 'MHz' }),
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 3', min: 3.0, max: 4.0, val: 3.3, units: 'MHz' }),
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 4', min: 4.0, max: 5.0, val: 4.05, units: 'MHz' }),
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 5', min: 5.0, max: 6.0, val: 5.15, units: 'MHz' }),
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 6', min: 6.0, max: 7.0, val: 6.2, units: 'MHz' }),
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 7', min: 7.0, max: 8.0, val: 7.3, units: 'MHz' }),
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 8', min: 8.0, max: 9.0, val: 8.7, units: 'MHz' }),
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 9', min: 9.0, max: 10.0, val: 9.3, units: 'MHz' }),
                LabeledValueSliderV({ class: styles.lvSliderV, labelText: 'Group 10', min: 30.0, max: 50.0, val: 42.0, units: 'MHz' })
        ]})
    ];

    self.Type = "VSliderDemo";

    return self;
};

export default _Create;

