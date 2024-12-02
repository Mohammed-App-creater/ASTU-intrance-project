
interface Props {
    text: string[];
}
const PreFormattedText: React.FC<Props> = ( {text} ) => {
    const textString = text.join('\n');
    return (
        <div className=" w-full h-auto  overflow-x-hidden  ">
            <pre className=" w-full h-auto  text-wrap  dark:text-white">
                {textString}
            </pre>
            
        </div>
    )
}

export default PreFormattedText;