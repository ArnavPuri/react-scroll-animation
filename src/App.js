import './App.css';
import {useState} from "react";

const LINE_HEIGHT = 57;
const activities = ["Pool Villa", "12-D Theater", "Horror Theme Night", "Land Zorbing", "Scuba Diving", "Floating Cottages", "Stone Painting"];
const activityImages = ['/images/pool.jpg', '/images/theater.jpg', '/images/horror.jpg', '/images/zorbing.jpg', '/images/scuba.jpg', '/images/cottages.jpg', '/images/stone-painting.jpg']
const TOPS_CONST = new Array(activities.length).fill(0).map((val, i) => i * LINE_HEIGHT);
const ACTIVE_TOP_HEIGHT = LINE_HEIGHT * 3;

function App() {
    let [tops, setTops] = useState(TOPS_CONST);
    let [activeImage, setActiveImage] = useState(activityImages[3]);
    let rotateByShift = (shift, targetIdx) => {
        let isReverse = false;
        if (shift < 0) {
            shift = -shift;
            isReverse = true;
        }
        let cpFront = isReverse ? tops.slice(tops.length - shift) : tops.slice(0, shift);
        let cpBack = isReverse ? tops.slice(0, tops.length - shift) : tops.slice(shift);

        let newArr = isReverse ? cpFront.concat(cpBack) : cpBack.concat(cpFront);
        setTops(newArr);
        setActiveImage(() => activityImages[targetIdx]);
        console.log("active", activeImage);
    };

    let rotate = (currIdx) => {
        let targetIdx = tops.findIndex((val) => val === ACTIVE_TOP_HEIGHT);

        console.log("Target", activityImages[currIdx], currIdx);
        rotateByShift(targetIdx - currIdx, targetIdx)
    };

    return (
        <div className="container">
            <div className="section">
                {activityImages.map((img, i) =>
                    (<div className={(activeImage === img ? "bg-container" : "hidden")}
                          style={{backgroundImage: 'url(' + img + ')'}} key={img}/>)
                )}

                <div className="column left flex-1">I want to experience</div>
                <div className="column right flex-1">
                    <div className="active-bar"></div>
                    <div className="activities-list">
                        {activities.map((item, i) => (
                            <div className={(tops[i] === ACTIVE_TOP_HEIGHT ? 'active-item ' : ' ') + "activity-name"}
                                 style={{top: tops[i]}}
                                 key={i} onClick={(e) => rotate(i)}>
                                {item}
                            </div>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;


// Math way to move around NOT WORKING
// cp = cp.map(val => {
// Math way
// if (val < LINE_HEIGHT*shift){
//     return (342 - val);
// }else if (val > LINE_HEIGHT*shift){
//     return val - LINE_HEIGHT*shift;
// }
// return val + LINE_HEIGHT*shift
// });


// discarded onClick on item  NOT WORKING
// onClick={(e) => {
//     if (i === currItem) {
//         return
//     } else if (i < currItem) {
//         let targetJump = currItem - i;
//         tops.forEach((top, i, arr) => {
//             let newH = top + targetJump * LINE_HEIGHT;
//             if (newH > LINE_HEIGHT * activities.length) {
//                 newH = newH - LINE_HEIGHT * activities.length;
//             }
//             arr[i] = newH;
//         });
//     } else {
//         let targetHeight = i - currItem;
//         tops.forEach((top, i, arr) => {
//             let newH = top - targetHeight * i;
//             if (top < LINE_HEIGHT * activities.length) {
//                 newH = LINE_HEIGHT * activities.length - top;
//             }
//             arr[i] = newH;
//         });
//     }
//     setCurrItem(i)
// }}

