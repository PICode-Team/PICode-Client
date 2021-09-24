import { useState } from 'react'

import { DeleteForever, Edit } from '@material-ui/icons'

import { boardStyle } from '../../../styles/service/issue'
import { IKanban } from '../../../types/issue.types'

interface IBoardProps {
  kanbanList: IKanban[] | null
}

function Board(props: IBoardProps) {
  const { kanbanList } = props
  const classes = boardStyle()
  const [kanbanIssue, setKanbanIssue] = useState<string>('')

  const handleLinkIssuePage = () => {
    // (e) => {
    //   e.stopPropagation();
    //   e.preventDefault();
    //   window.location.href =
    //     router.route +
    //     "/issue" +
    //     router.asPath.split(router.route)[1] +
    //     `&kanban=${v.title}`;
    // }
  }

  const handleEditBoard = () => {
    // (e) => {
    //   e.stopPropagation();
    //   setModalData({
    //     title: v.title,
    //     uuid: v.uuid,
    //   });
    //   setModal(true);
    // }
  }

  const handleDeleteBoard = () => {
    // (e) => {
    //   e.stopPropagation()
    //   ctx.ws.current.send(
    //     JSON.stringify({
    //       category: 'kanban',
    //       type: 'deleteKanban',
    //       data: {
    //         uuid: v.uuid,
    //       },
    //     })
    //   )
    //   window.location.reload()
    // }
  }

  return (
    <div className={classes.board}>
      {kanbanIssue === '' && (
        <>
          <div className={classes.content} id="kanbanBoard">
            {kanbanList !== null &&
              kanbanList.map((v, i) => {
                return (
                  <div key={v.uuid} onClick={handleLinkIssuePage} className={classes.item}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <div style={{ fontSize: '16px' }}>{v.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={classes.icon} onClick={handleEditBoard}>
                          <Edit
                            style={{
                              width: '20px',
                              height: '20px',
                              marginRight: '4px',
                            }}
                          />
                        </div>
                        <div className={classes.icon} onClick={handleDeleteBoard}>
                          <DeleteForever style={{ width: '20px', height: '20px' }} />
                        </div>
                      </div>
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <div
                        style={{
                          width: '100%',
                          height: '10px',
                          backgroundColor: '#6d7681',
                          borderRadius: '6px',
                        }}
                      >
                        <div
                          style={{
                            width: '0%',
                            height: '10px',
                            backgroundColor: '#4078b8',
                            borderRadius: '6px',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>{v.description ?? 'this kanbanboard is no have description.'}</div>
                  </div>
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}

export default Board
