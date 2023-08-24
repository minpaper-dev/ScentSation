import React, { useRef, useState } from 'react'
import { styled } from 'styled-components'
import CustomFont from '../../styles/CustomFont'
import palette from '../../styles/CustomColor'
import useFirestore from '../../hooks/useFirestore'

const CommentItem = ({
  item,
  uid,
  setDeleteCommentId,
  setIsDeleteCommentModal,
}) => {
  const inputRef = useRef()
  const { updateData } = useFirestore()

  const [isEdit, setIsEdit] = useState(false)
  const [description, setDescription] = useState(item.content)

  const onClickDeleteBtn = () => {
    setDeleteCommentId(item.id)
    setIsDeleteCommentModal(true)
  }

  const onClickEditBtn = async () => {
    if (!description) return
    setIsEdit(!isEdit)

    if (!isEdit) {
      inputRef.current.focus()
    } else {
      await updateData('comment', item.id, { content: description })
    }
  }

  return (
    <>
      <Comment key={item.id}>
        <WrapProfile>
          <Wrap>
            <ProfileImage src={item.userInfo.image} />
            <CustomFont
              content={item.userInfo.nickname}
              $marginRi={1}
              $marginLf={1}
            />
            <CustomFont
              content={`${item.userInfo.age}세 / ${item.userInfo.category} / ${item.userInfo.gender}`}
            />
          </Wrap>
          {uid === item.userInfo.id && (
            <WrapButton>
              <Button onClick={onClickEditBtn}>
                <CustomFont content={isEdit ? '수정완료' : '수정'} />
              </Button>
              <Button onClick={onClickDeleteBtn}>
                <CustomFont content={'삭제'} />
              </Button>
            </WrapButton>
          )}
        </WrapProfile>
        <Input
          ref={inputRef}
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
          isEdit={isEdit}
          readOnly={!isEdit}
          placeholder="댓글을 입력해주세요"
        />
      </Comment>
    </>
  )
}

const Comment = styled.div`
  padding: 1rem 0;
`

const WrapProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
`

const WrapButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Button = styled.button`
  margin: 0 0.5rem;
`
const Wrap = styled.div`
  display: flex;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  font-size: 1.2rem;
  border: 0px;
  background-color: ${props => (props.isEdit ? palette.Gray400 : 'white')};
  padding: 0.5rem;
  outline: none;

  &::placeholder {
    font-size: 1rem;
  }
`

export default CommentItem
