import { ClimbingBoxLoader } from "react-spinners";
export default function Spinner() {
return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <ClimbingBoxLoader color="#2de340" loading />
            </div>
        );

}
