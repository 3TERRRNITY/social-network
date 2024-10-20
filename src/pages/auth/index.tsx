import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import { useState } from 'react'
import { Login } from '../../features/login'

export const Auth = () => {
  const [selected, setSelected] = useState('login')
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col'>
        <Card className='max-w-full w-[340px] h-[450px]'>
          <CardBody className='overflow-hidden'>
            <Tabs
              fullWidth
              size='md'
              selectedKey={selected}
              variant={'underlined'}
              onSelectionChange={key => setSelected(key as string)}
            >
              <Tab key='login' title='Приветствую, воин!'>
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key='sign-up' title='Представься, путник!'>
                Регистрация
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
