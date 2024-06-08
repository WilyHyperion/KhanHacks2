import Menu from "@/components/Menu";

export default function Upload() {
    const submitFiles = () => {
        
    };

    return (
        <>
            <Menu />
            <div style={{ float: 'right', marginRight: '5lh' }}>
                <button onClick={submitFiles}>Upload Notes Files (.jpg, .pdf, .png)</button>
            </div>
        </>
    );
}