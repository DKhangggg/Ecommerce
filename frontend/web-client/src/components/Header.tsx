import {Flex,Input} from 'antd';
export function Header(){
    return (
       <>
           <Flex vertical gap={12}>
               <Input.Search placeholder="Filled" variant="filled" />
           </Flex>
       </>
    )
}

