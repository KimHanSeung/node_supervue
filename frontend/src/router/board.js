import List from '@/components/board/List'
import Modify from '@/components/board/Modify'
import Read from '@/components/board/Read'
import Write from '@/components/board/Write'

export default [
  {
    path: '/board/list',
    name: 'list',
    component: List
  },
  {
    path: '/board/modify',
    name: 'modify',
    component: Modify
  },
  {
    path: '/board/read',
    name: 'read',
    component: Read
  },
  {
    path: '/board/write',
    name: 'write',
    component: Write
  }
]
