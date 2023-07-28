
'use client'

import "./button.css"
import { Alert, AlertDescription, Button, Flex, Heading, Input } from "@chakra-ui/react"

export default function Home() {
  return (
    <Flex >
      <Flex direction="column" background="gray.100">
      <Heading mb={6}>Log in</Heading>
      <Input placeholder="teste@teste.com" variant="filled" mb={3} type="email"/>
      <Button className="-button" onClick={() => alert("teste")}>teste</Button>
      </Flex>
        
        
    </Flex>
  )
}
