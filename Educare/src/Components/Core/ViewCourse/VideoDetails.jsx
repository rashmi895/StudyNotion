import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../Services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import ReactPlayer from 'react-player'

import {AiFillPlayCircle} from "react-icons/ai"
import IconBtn from '../../Common/IconBtn';

const VideoDetails = () => {
    const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {token} = useSelector((state)=>state.auth);
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=>state.viewCourse);
  const [previewSource, setPreviewSource] = useState("")
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [useNative, setUseNative] = useState(false);
  const [loading, setLoading] = useState(false);
    
  useEffect(() => {
    const setVideoSpecificDetails = () => {
        // console.log("In VideoDetails, courseSectionData",courseSectionData)
        if(!courseSectionData.length)
            return;
        if(!courseId && !sectionId && !subSectionId) {
            navigate("/dashboard/enrolled-courses");
        }
        else {
            //let's assume k all 3 fields are present

            const filteredData = courseSectionData.filter(
                (course) => course._id === sectionId
            )

            const filteredVideoData = filteredData?.[0].subSection.filter(
                (data) => data._id === subSectionId
            )

            setVideoData(filteredVideoData[0]);
            setPreviewSource(courseEntireData.thumbnail)
            setVideoEnded(false);

        }
    }
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname])

    useEffect(() => {
        if (videoData?.videoUrl) {
            // helpful debug log for verifying the URL in browser console
            // eslint-disable-next-line no-console
            console.log('Video URL:', videoData.videoUrl);
        }
    }, [videoData]);
  
  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
        return true;
    }
    else {
        return false;
    }
  } 

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length - 1 &&
        currentSubSectionIndex === noOfSubSections - 1) {
            return true;
        }
    else {
        return false;
    }


  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubSections - 1) {
        //same section ki next video me jao
        const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
        //next video pr jao
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else {
        //different section ki first video
        const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
        const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
        ///iss voide par jao 
        navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
    )

    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex != 0 ) {
        //same section , prev video
        const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1];
        //iss video par chalge jao
        navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else {
        //different section , last video
        const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
        const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
        const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
        //iss video par chalge jao
        navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

    }


  }

  const handleLectureCompletion = async() => {

    ///dummy code, baad me we will replace it witht the actual call
    setLoading(true);
    //PENDING - > Course Progress PENDING
    const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
    //state update
    if(res) {
        dispatch(updateCompletedLectures(subSectionId)); 
    }
    setLoading(false);

  }
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 text-white">
      {
        !videoData ? (<img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />)
        : (
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
                <ReactPlayer
                    ref={playerRef}
                    url={videoData?.videoUrl}
                    controls
                    playing={playing}
                    className="absolute left-0 top-0"
                    width="100%"
                    height="100%"
                    onEnded={() => {
                        setVideoEnded(true);
                        setPlaying(false);
                    }}
                    light={previewSource}
                />

                {/* Play overlay for starting playback on user interaction */}
                {!playing && (
                    <div className="absolute inset-0 z-20 grid place-items-center">
                        <button
                            onClick={() => setPlaying(true)}
                            className="text-4xl text-white bg-black/40 rounded-full p-4"
                            aria-label="Play video"
                        >
                            ▶
                        </button>
                    </div>
                )}

                {/* Debug: show video URL so you can verify it's correct */}
                {videoData?.videoUrl && (
                    <div className="mt-2 text-sm text-gray-300 break-all">
                        URL: {videoData.videoUrl}
                        <div className="mt-1">
                            <button
                                onClick={() => setUseNative((s) => !s)}
                                className="text-xs text-yellow-300 underline"
                            >
                                {useNative ? 'Hide native player' : 'Try native player'}
                            </button>
                        </div>
                    </div>
                )}

                {useNative && videoData?.videoUrl && (
                    <div className="mt-4">
                        <video
                            controls
                            style={{ width: '100%', maxHeight: '70vh' }}
                            src={videoData.videoUrl}
                            crossOrigin="anonymous"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}

                {videoEnded && (
                    <div
                        style={{
                            backgroundImage:
                                "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                        }}
                        className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                    >
                        {!completedLectures.includes(subSectionId) && (
                            <IconBtn
                                disabled={loading}
                                onclick={() => handleLectureCompletion()}
                                text={!loading ? "Mark As Completed" : "Loading..."}
                                customClasses="text-xl max-w-max px-4 mx-auto"
                            />
                        )}

                        <IconBtn
                            disabled={loading}
                            onclick={() => {
                                if (playerRef?.current) {
                                    try {
                                        playerRef.current.seekTo(0);
                                    } catch (e) {
                                        // fallback for other player refs
                                    }
                                    setVideoEnded(false);
                                }
                            }}
                            text="Rewatch"
                            customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                        />

                        <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                            {!isFirstVideo() && (
                                <button disabled={loading} onClick={goToPrevVideo} className="blackButton">
                                    Prev
                                </button>
                            )}
                            {!isLastVideo() && (
                                <button disabled={loading} onClick={goToNextVideo} className="blackButton">
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
      }
      <h1 className="mt-4 text-3xl font-semibold">
        {videoData?.title}
      </h1>
      <p className="pt-2 pb-6">
        {videoData?.description}
      </p>
    </div>
  )
}

export default VideoDetails
