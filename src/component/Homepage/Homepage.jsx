import React, { useState } from 'react';

// const comments = [
//   {
//     id: 1,
//     comments: 'some text',
//     timeStamp: '7 hours ago',
//     reply: ['reply1', 'reply2']
//   }
// ];

const Homepage = () => {

  const [comments, setComments] = useState([]);
  const [value, setValue] = useState('');
  const [replyValue, setReplyValue] = useState('');
  const [editReply, setEditReply] = useState('');

  const changeHanler = (e) => {
    setValue(e.target.value);
  };

  const submitHanler = () => {
    if (value) {
      setComments([...comments, { comment: value, id: new Date().getTime().toString(), reply: [] }]);
      setValue('');
    }
  };

  const submitReply = (id) => {
    const shallowData = [...comments];
    const replyToUpdate = shallowData.map(el => {
      if (el.id === id) {
        return {
          ...el,
          reply: [...el.reply, replyValue]
        }
      }
      return el;
    })
    setComments(replyToUpdate)
    setReplyValue('');
    setEditReply(!editReply);
  };

  const editReplyHandler = (id) => {
    setEditReply(id);
  };

  const deleteHandler = (id) => {
    const deleteComment = comments.filter(el => el.id !== id)
    setComments(deleteComment);
  };

  const replyDeleteHandler = (id, index) => {
    const sd = [...comments]
    const deleteComment = sd.map(el => {
      if (el.id === id) {
        console.log(el, 'in');
        
        return {
          ...el,
          reply: el.reply.filter((_, i) => i !== index)
        }
      }
      return el;
    });
    setComments(deleteComment);
  };

  return (
    <section className='py-10'>
      <div className='container '>
        <h1 className='text-3xl text-black'>Add comments</h1>
        <div className='mt-5'>
          <div className='flex items-center gap-x-4 w-full'>
            <div className='w-12 h-10 bg-slate-400'></div>
            <input
              className='border border-purple-400 px-4 py-2 text-base w-full'
              type="text"
              onChange={(e) => changeHanler(e)}
              value={value}
            />
            <button onClick={() => submitHanler()} className='px-4 py-2 bg-purple-700 rounded-md'>
              <span className='text-base text-white'>Submit</span>
            </button>
          </div>

          <div>
            {
              comments.length ? (
                comments.map((el) => (
                  <>
                    <div key={el?.id} className='flex mt-5 gap-x-4'>
                      <div className='w-12 h-10 bg-slate-400'></div>
                      <div>
                        <div className='flex items-center gap-x-10'>
                          <p className='text-base text-blue-600'>user {el?.id}</p>
                          <p className='text-sm text-gray-400'> 7 hours ago</p>
                        </div>
                        <div className='flex gap-x-4'>
                          <p className='text-base text-black'>{el?.comment}</p>
                          <button onClick={() => deleteHandler(el?.id)} className='px-2 py-1 bg-red-600 rounded-md'>
                            <span className='text-sm text-white'>Delete</span>
                          </button>
                        </div>
                        {
                          editReply === el?.id ? (
                            <div className='flex gap-x-4 mt-3'>
                              <input
                                className='border border-purple-400 px-4 py-2 text-base w-full'
                                type="text"
                                onChange={(e) => setReplyValue(e.target.value)}
                                value={replyValue}
                              />
                              <button onClick={() => submitReply(el?.id)} className='px-4 py-2 bg-purple-700 rounded-md'>
                                <span className='text-base text-white'>Add</span>
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => editReplyHandler(el?.id)}>
                              <span className='text-sm text-gray-400'>Reply</span>
                            </button>
                          )
                        }

                      </div>
                    </div>
                    {
                      el?.reply?.length ? el.reply.map((reply, index) => (
                        <div key={index.toString()} className='flex mt-5 ml-10 gap-x-4'>
                          <div className='w-12 h-10 bg-slate-400'></div>
                          <div>
                            <div className='flex items-center gap-x-10'>
                              <p className='text-base text-blue-600'>user 1</p>
                              <p className='text-sm text-gray-400'> 7 hours ago</p>
                            </div>
                            <div className='flex gap-x-4'>
                              <p className='text-base text-black'>{reply}</p>
                              <button onClick={() => replyDeleteHandler(el?.id, index)} className='px-2 py-1 bg-red-600 rounded-md'>
                                <span className='text-sm text-white'>Delete</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )) : null
                    }
                  </>
                ))
              ) : null
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Homepage;