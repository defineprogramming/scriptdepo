import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ScriptViewer from '../../components/ScriptViewer'
import { getScriptById } from '../../utils/api'

const ScriptPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [script, setScript] = useState(null)

  useEffect(() => {
    if (id) {
      getScriptById(id).then(setScript)
    }
  }, [id])

  if (!script) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ScriptViewer script={script} />
    </div>
  )
}

export default ScriptPage