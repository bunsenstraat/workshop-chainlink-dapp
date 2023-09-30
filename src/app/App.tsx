import React, {useEffect, useState} from 'react'
import { RemixClient } from '../components/client'

const client = new RemixClient()

export default function App() {
  const [bugs, setBugs] = useState<any[]>([])
  useEffect(() => {
    console.log('App mounted')

  }, [])

  useEffect(() => {
    bugs.map((bug, i) => {
      console.log('bug', bug.approved)
    })

  }, [bugs])

  const refresh = async () => {
    const bugs =  await client.call('fileManager', 'readFile', './build/bugs.json')
    console.log('bugs', JSON.parse(bugs))
    setBugs(JSON.parse(bugs))
  }
  return (
    <>
      <div className="">
        <button className='btn btn-primary' onClick={() => {
          refresh() 
            }}>Refresh reports</button>
            <p className="card-text">Number of reports: {bugs.length}</p>
            <ul className="list-group small">
              {bugs.map((bug, i) => {
                return <li className="list-group-item" key={i}>
                  
                  <a rel='noreferrer' href={`https://ipfs.io/ipfs/${bug.cid}`} className='mr-2' target='_blank'>
                  {bug.cid}</a>
 
                  {bug.approved > 0 ?  <span className='badge badge-success'>approved</span> : <></>}

                  {bug.rejected > 0 ? <span className='badge badge-warning'>rejected</span> : <></>}
  
                  {bug.rejected === 0 && bug.approved === 0 ? <span className='badge badge-primary'>new</span> : <></>}
  
                </li>
              })}
            </ul>
          </div>
    </>
  )
}
