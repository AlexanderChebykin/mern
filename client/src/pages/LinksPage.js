import React, { useCallback, useEffect,  useState, useContext} from 'react'
import { useHttp } from '../hooks/http.hooks'
import { Loader } from '../components/Loader'
import { LinksList } from '../components/LinksList'
import { AuthContext } from '../context/AuthContext'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback( async () => {
        try{
            const fetched = await request(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched);
        }catch(e){}
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if(loading){
        return <Loader />
    }
    return (
        <>
        {!loading && <LinksList links={links} />}
        </>
    )
}