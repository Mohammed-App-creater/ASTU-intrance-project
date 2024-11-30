
interface Props {
    text: string[];
}
const PreFormatedText: React.FC<Props> = ( text ) => {
    const textString = text.text.join('\n');
    return (
        <div className=" w-full h-auto bg-[#292d33] rounded-xl overflow-x-hidden  ">
            <pre className=" w-full h-auto  text-wrap">
                {textString}
            </pre>
            
        </div>
    )
}

export default PreFormatedText;