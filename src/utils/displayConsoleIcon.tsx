import {
    RiPlaystationLine,
    RiXboxFill,
    RiXboxLine,
    RiComputerLine,
} from 'react-icons/ri'
import {
    SiPlaystation5,
    SiPlaystation3,
    SiPlaystationvita,
    SiNintendoswitch,
    SiNintendo3Ds,
    SiNintendo,
    SiLinux,
} from 'react-icons/si'
import {
    AiFillApple,
    AiFillAndroid,
    AiFillWindows,
    AiOutlineMobile,
} from 'react-icons/ai'
import { TbXboxX } from 'react-icons/tb'

export const displayConsoleIcon = (platform: string) => {
    switch (platform) {
        case 'PC':
            return <AiFillWindows />
        case 'PlayStation 4':
            return <RiPlaystationLine />
        case 'PlayStation 3':
            return <SiPlaystation3 />
        case 'PlayStation 5':
            return <SiPlaystation5 />
        case 'PS Vita':
            return <SiPlaystationvita />
        case 'Xbox One':
        case 'Xbox':
            return <RiXboxFill />
        case 'Xbox Series S/X':
            return <RiXboxLine />
        case 'Nintendo Switch':
            return <SiNintendoswitch />
        case 'iOS':
            return <AiOutlineMobile />
        case 'macOS':
            return <AiFillApple />
        case 'Android':
            return <AiFillAndroid />
        case 'Nintendo 3DS':
            return <SiNintendo3Ds />
        case 'Nintendo DS':
            return <SiNintendo />
        case 'Linux':
            return <SiLinux />
        case 'Xbox 360':
            return <TbXboxX />
        default:
            return <RiComputerLine />
    }
}
