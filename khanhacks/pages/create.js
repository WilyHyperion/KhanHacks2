import UploadNotes from "@/components/UploadNotes";
import Menu from "@/components/Menu";


export default function CreateNote() {
    return (
        <>
        <Menu page= {2}/>
        <div className="absolute left-[50vw] top-[15vh]">
        <UploadNotes />
        </div>
        </>
    );
}