import React, { useState, useEffect } from 'react';
import { getCharacter } from '../../request/get-character';
import { PopUp } from '../popup/PopUp';
import { PopUpInputList } from '../popup/Popup-list-inputs';
import { MyButton } from '../button/MyButton';
import { deleteCharacter } from '../../request/delete-character';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/App.css';

export function PostIdPage() {
    const navigate = useNavigate();
    const params = useParams();
    const [modal, setModalVisible] = useState(false);
    const [info, setInfo] = useState({
        _id: '',
        height: '',
        race: '',
        gender: '',
        birth: '',
        spouse: '',
        death: '',
        realm: '',
        image: null,
        hair: '',
        name: '',
        wikiUrl: ''
    });
    const [update, setUpdate] = useState(false);

    async function getInfoCharacter(id) {
        try {
            const data = await getCharacter(id);
            console.log(data.docs);
            setInfo(data.docs);
        } catch (error) {
            console.log('ERROR');
        }
    }

    useEffect(() => {
        getInfoCharacter(params.id);
        setUpdate(false);
    }, [update]);

    function deletedCharacter() {
        navigate('/posts');
    }

    return (
        <div className="container characterInfo">
            <MyButton
                onClick={(e) => {
                    e.stopPropagation();
                    history.back();
                }}
            >
                Back
            </MyButton>
            <PopUp visible={modal} setVisible={setModalVisible}>
                <PopUpInputList
                    idInfo={info}
                    setUpdate={setUpdate}
                    setVisible={setModalVisible}
                    open={modal}
                />
            </PopUp>
            <div className="App">
                <img
                    src={
                        info.image
                            ? info.image.link
                            : 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/user-profile-icon.png'
                    }
                    className="img"
                ></img>
                <h1>{info.name}</h1>
                <hr></hr>
                <h3>{info.race || 'unknown'}</h3>
                <p>Gender: {info.gender || 'unknown'}</p>
                <p>
                    {info.birth || 'unknown'} - {info.death || 'unknown'}
                </p>
                <p>Realm: {info.realm || 'unknown'}</p>
                <hr></hr>
                <p>Height: {info.height || 'unknown'}</p>
                <p>Hair: {info.hair || 'unknown'}</p>
                <hr></hr>
                <p>Spouse: {info.spouse || 'unknown'}</p>
                <hr></hr>
                <a href={info.wikiUrl}>More info on Wiki</a>
                <MyButton
                    onClick={() => {
                        setModalVisible(true);
                    }}
                >
                    Edit
                </MyButton>
                <MyButton
                    onClick={() => {
                        deleteCharacter(params.id);
                        deletedCharacter();
                    }}
                >
                    Delete
                </MyButton>
            </div>
        </div>
    );
}
