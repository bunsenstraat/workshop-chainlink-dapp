import React, {useEffect, useState} from 'react'
import { RemixClient } from '../components/client'
const client = new RemixClient()

export default function App() {
  const [contents, setContents] = useState('')
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
      <div className="m-5 p-2">
        <h1>Chainlink Semaphore Dapp</h1>
        <button className='btn btn-primary' onClick={() => {
          refresh() 
            }}>Refresh</button>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Bugs</h5>
            <p className="card-text">{bugs.length}</p>
            <ul className="list-group">
              {bugs.map((bug, i) => {
                return <li className="list-group-item" key={i}>
                  {bug.cid}
                  <br/>
                  approved: {bug.approved.hex == '0x01' ? 'true' : 'false'}
                  <br/>
                  rejected: {bug.rejected.hex == '0x01' ? 'true' : 'false'}
                  <br/>
                </li>
              })}
            </ul>
          </div>
          </div>
      </div>
    </>
  )
}
