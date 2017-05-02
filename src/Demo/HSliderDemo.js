import { Div, P, Img } from "../DOM/Elements";
import Code from "../DOM/Code";
import LabeledValueSlider from "../DOM/LabeledValueSlider";

// styles
import styles from "./HSliderDemo.less"

// raw import
import app_src2 from "!raw-loader!../DOM/LabeledValueSlider.js";

const _Create = (args) => {
    let payload = Object.assign({}, args);

    let self = [
        P({ innerText: 'Some LabeledValueSlider in action' }),
        Div({
            id: 'sliderGroup', class: '', children: [
                P({
                    children: [
                        LabeledValueSlider({ class: styles.lvSliderH, labelText: 'View Angle', min: -180, max: 180, val: 3.0, units: '°' }),
                        LabeledValueSlider({ class: styles.lvSliderH, labelText: 'Field Of View', min: 20, max: 90, val: 45.0, units: '°' }),
                    ], style: { 'margin-top': '8px' }
                }),
                P({
                    children: [
                        LabeledValueSlider({ class: styles.lvSliderH, labelText: 'Earth', min: -80, max: 60, val: 12.6, units: '℃' }),
                        LabeledValueSlider({ class: styles.lvSliderH, labelText: 'Mars', min: -120, max: 120, val: 52.6, units: '℃' }),
                    ], style: { 'margin-top': '8px' }
                }),
                P({
                    children: [
                        LabeledValueSlider({ class: styles.lvSliderH, labelText: 'Core Voltage', min: 1.0, max: 1.4, val: 1.1, units: 'V' }),
                        LabeledValueSlider({ class: styles.lvSliderH, labelText: 'RAM Voltage', min: 1.8, max: 2.5, val: 2.0, units: 'V' })
                    ], style: { 'margin-top': '8px' }
                })
            ]
        }),
        Code({ src: app_src2, srcType: 'js', class: styles.code })
    ];

    self.Type = "HSliderDemo";

    return self;
};

export default _Create;

