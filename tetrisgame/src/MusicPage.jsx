import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Heart,
  Send,
  Plus,
  Search,
  Users,
  MessageCircle,
  Flame,
  Calendar,
  Trophy,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Share,
  Bookmark,
  MoreHorizontal,
  User,
  Clock,
  Leaf,
  Wind,
  Sparkles,
} from "lucide-react";

const ChatRoom = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isBreathing, setIsBreathing] = useState(true);
  const [activeChannel, setActiveChannel] = useState("mindfulness");
  const [newMessage, setNewMessage] = useState("");
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [showNewPost, setShowNewPost] = useState(false);
  const [userStreak] = useState(7);
  const [totalMinutes] = useState(120);
  const messagesEndRef = useRef(null);

  const [channels] = useState([
    {
      id: "mindfulness",
      name: "Mindfulness",
      icon: <Leaf className="w-4 h-4" />,
      members: 12500,
      color: "rgba(180, 255, 180, 0.3)",
    },
    {
      id: "meditation",
      name: "Daily Meditation",
      icon: <Wind className="w-4 h-4" />,
      members: 8900,
      color: "rgba(100, 180, 255, 0.3)",
    },
    {
      id: "support",
      name: "Support Circle",
      icon: <Heart className="w-4 h-4" />,
      members: 6200,
      color: "rgba(255, 180, 180, 0.3)",
    },
    {
      id: "gratitude",
      name: "Gratitude Journal",
      icon: <Sparkles className="w-4 h-4" />,
      members: 4100,
      color: "rgba(255, 255, 100, 0.3)",
    },
    {
      id: "breathwork",
      name: "Breathing Space",
      icon: <Wind className="w-4 h-4" />,
      members: 3800,
      color: "rgba(230, 140, 230, 0.3)",
    },
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      channel: "mindfulness",
      author: "ZenSeeker_42",
      title: "Found peace in morning walks",
      content:
        "Started walking without my phone for 20 minutes each morning. The difference in my mental clarity is incredible. Just wanted to share this simple practice that has transformed my days.",
      time: "2 hours ago",
      upvotes: 47,
      downvotes: 2,
      comments: 12,
      userVote: null,
      replies: [
        {
          id: 101,
          author: "MindfulMama",
          content:
            "This is beautiful! I do the same thing and it's like a reset button for my entire day.",
          time: "1 hour ago",
          upvotes: 8,
          downvotes: 0,
          userVote: null,
        },
        {
          id: 102,
          author: "NatureLover23",
          content:
            "Walking meditation is so underrated. I love feeling connected to the earth beneath my feet.",
          time: "45 minutes ago",
          upvotes: 5,
          downvotes: 0,
          userVote: null,
        },
      ],
    },
    {
      id: 2,
      channel: "meditation",
      author: "CalmWaters",
      title: "Struggling with consistency",
      content:
        "I keep starting meditation practices but can't seem to maintain them for more than a week. Any gentle advice for building this habit?",
      time: "4 hours ago",
      upvotes: 23,
      downvotes: 0,
      comments: 18,
      userVote: null,
      replies: [
        {
          id: 201,
          author: "SteadyPractice",
          content:
            "Start with just 3 minutes. I mean it - just 3 minutes. Once that feels natural, you can slowly extend it.",
          time: "3 hours ago",
          upvotes: 15,
          downvotes: 0,
          userVote: null,
        },
      ],
    },
    {
      id: 3,
      channel: "support",
      author: "GentleHeart",
      title: "Grateful for this community",
      content:
        "Going through a difficult time, and this space has been a beacon of light. Thank you all for creating such a compassionate environment.",
      time: "6 hours ago",
      upvotes: 89,
      downvotes: 0,
      comments: 24,
      userVote: "up",
      replies: [],
    },
  ]);

  // Updated gradient logic to match landing page
  const updateGradients = useCallback(() => {
    const time = Date.now() / 8000; // Same timing as landing page
    const x = 50 + Math.sin(time) * 20; // Same movement range
    const y = 50 + Math.cos(time) * 20;
    const scale = 1 + Math.sin(time / 2) * 0.15; // Same scale variation

    const primaryGradient = document.querySelector(".primary-gradient");
    const secondaryGradient = document.querySelector(".secondary-gradient");

    if (primaryGradient && secondaryGradient) {
      primaryGradient.style.background = isDarkMode
        ? `radial-gradient(
          circle at ${x}% ${y}%,
          rgba(255, 255, 100, 0.95) 0%,
          rgba(100, 180, 255, 0.85) 45%,
          rgba(230, 140, 230, 0.85) 100%
        )`
        : `radial-gradient(
          circle at ${x}% ${y}%,
          rgba(255, 220, 100, 0.95) 0%,
          rgba(130, 210, 255, 0.85) 45%,
          rgba(255, 180, 180, 0.85) 100%
        )`;
      primaryGradient.style.transform = `scale(${scale + 0.2})`; // Same scale offset

      secondaryGradient.style.transform = `scale(${scale})`;
    }

    requestAnimationFrame(updateGradients);
  }, [isDarkMode]);

  useEffect(() => {
    updateGradients();
  }, [updateGradients]);

  const handleVote = (postId, voteType, isReply = false) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId && !isReply) {
          const newPost = { ...post };
          if (newPost.userVote === voteType) {
            // Remove vote
            newPost.userVote = null;
            newPost[voteType === "up" ? "upvotes" : "downvotes"]--;
          } else {
            // Change or add vote
            if (newPost.userVote) {
              newPost[newPost.userVote === "up" ? "upvotes" : "downvotes"]--;
            }
            newPost.userVote = voteType;
            newPost[voteType === "up" ? "upvotes" : "downvotes"]++;
          }
          return newPost;
        }
        // Handle reply votes
        if (isReply) {
          return {
            ...post,
            replies: post.replies.map((reply) => {
              if (reply.id === postId) {
                const newReply = { ...reply };
                if (newReply.userVote === voteType) {
                  newReply.userVote = null;
                  newReply[voteType === "up" ? "upvotes" : "downvotes"]--;
                } else {
                  if (newReply.userVote) {
                    newReply[
                      newReply.userVote === "up" ? "upvotes" : "downvotes"
                    ]--;
                  }
                  newReply.userVote = voteType;
                  newReply[voteType === "up" ? "upvotes" : "downvotes"]++;
                }
                return newReply;
              }
              return reply;
            }),
          };
        }
        return post;
      })
    );
  };

  const handleNewPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: Date.now(),
        channel: activeChannel,
        author: "You",
        title: newPost.title,
        content: newPost.content,
        time: "just now",
        upvotes: 1,
        downvotes: 0,
        comments: 0,
        userVote: "up",
        replies: [],
      };
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "" });
      setShowNewPost(false);
    }
  };

  const currentChannel = channels.find((c) => c.id === activeChannel);
  const filteredPosts = posts.filter((post) => post.channel === activeChannel);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-slate-900" : "bg-blue-50"
      } overflow-x-hidden font-sans`}
    >
      {/* Background gradients - matched to landing page */}
      <div className="fixed inset-0 rounded-3xl">
        <div
          className={`absolute inset-0 rounded-3xl blur-3xl transition-transform duration-1000 primary-gradient 
          ${isBreathing ? "animate-breathe" : ""}`}
        />
        <div
          className={`absolute inset-0 rounded-3xl opacity-50 blur-3xl transition-transform duration-1000 secondary-gradient
          ${isBreathing ? "animate-breathe" : ""}`}
        />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none noise-overlay" />
      </div>

      {/* Navigation - matched to landing page style */}
      <nav className="relative z-10 w-full p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-white/90 font-serif text-3xl">
              Calyte Community
            </h1>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-white/90 text-sm">
                35,500 mindful souls
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-white/90">{userStreak} day streak</span>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-white/50 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for peace..."
                className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <button
              onClick={() => setIsAudioPlaying(!isAudioPlaying)}
              className="p-2 rounded-lg bg-white/10 text-white/90 hover:bg-white/20 transition-all"
            >
              {isAudioPlaying ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-white/10 text-white/90 hover:bg-white/20 transition-all"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Stats Banner - added to match landing page */}
      <div className="relative z-10 w-full bg-white/5 backdrop-blur-md border-y border-white/10">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-center gap-12">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-white/90">
              {totalMinutes} minutes of mindfulness
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-green-400" />
            <span className="text-white/90">
              Active in community discussions
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex gap-6 p-6">
        {/* Sidebar - Channels */}
        <div className="w-80 space-y-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/90 font-serif text-xl">Communities</h3>
              <button
                onClick={() => setShowNewPost(!showNewPost)}
                className="p-2 rounded-lg bg-white/10 text-white/90 hover:bg-white/20 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    activeChannel === channel.id
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor:
                      activeChannel === channel.id ? channel.color : undefined,
                  }}
                >
                  {channel.icon}
                  <div className="flex-1 text-left">
                    <div className="font-medium">{channel.name}</div>
                    <div className="text-xs text-white/50">
                      {channel.members.toLocaleString()} members
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h4 className="text-white/90 font-serif text-lg mb-4">
              Today's Mindfulness
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-white/70 text-sm">
                  156 people found peace today
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-white/70 text-sm">
                  89 acts of kindness shared
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-white/70 text-sm">
                  23 meditation streaks celebrated
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* New Post Modal */}
          {showNewPost && (
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-white/90 font-serif text-xl mb-4">
                Share Your Journey
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <textarea
                  placeholder="Share your thoughts, experiences, or questions..."
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white/90 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleNewPost}
                    className="bg-white/10 text-white/90 px-8 py-4 rounded-lg text-lg tracking-wide 
                      transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5"
                  >
                    Share
                  </button>
                  <button
                    onClick={() => setShowNewPost(false)}
                    className="bg-white/5 text-white/70 px-6 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Channel Header */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-4">
              {currentChannel?.icon}
              <div>
                <h2 className="text-white/90 font-serif text-2xl">
                  {currentChannel?.name}
                </h2>
                <p className="text-white/70">
                  A peaceful space for{" "}
                  {currentChannel?.members.toLocaleString()} mindful souls
                </p>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-white/70" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white/90 font-medium">
                          {post.author}
                        </span>
                        <span className="text-white/50 text-sm">•</span>
                        <span className="text-white/50 text-sm">
                          {post.time}
                        </span>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-white/90 font-serif text-xl mb-3">
                    {post.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Post Actions */}
                <div className="px-6 py-4 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVote(post.id, "up")}
                        className={`p-2 rounded-lg transition-all ${
                          post.userVote === "up"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <span className="text-white/80 font-medium">
                        {post.upvotes - post.downvotes}
                      </span>
                      <button
                        onClick={() => handleVote(post.id, "down")}
                        className={`p-2 rounded-lg transition-all ${
                          post.userVote === "down"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                    </div>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-all">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-all">
                      <Share className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 transition-all">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Replies */}
                {post.replies.length > 0 && (
                  <div className="border-t border-white/10">
                    {post.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="p-6 pl-12 border-l-2 border-white/10 ml-6"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                            <User className="w-3 h-3 text-white/70" />
                          </div>
                          <span className="text-white/90 font-medium text-sm">
                            {reply.author}
                          </span>
                          <span className="text-white/50 text-xs">•</span>
                          <span className="text-white/50 text-xs">
                            {reply.time}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed mb-3">
                          {reply.content}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleVote(reply.id, "up", true)}
                              className={`p-1 rounded transition-all ${
                                reply.userVote === "up"
                                  ? "bg-green-500/20 text-green-400"
                                  : "text-white/50 hover:text-white/70"
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </button>
                            <span className="text-white/60 text-xs">
                              {reply.upvotes - reply.downvotes}
                            </span>
                            <button
                              onClick={() => handleVote(reply.id, "down", true)}
                              className={`p-1 rounded transition-all ${
                                reply.userVote === "down"
                                  ? "bg-red-500/20 text-red-400"
                                  : "text-white/50 hover:text-white/70"
                              }`}
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                          <button className="text-white/50 hover:text-white/70 text-xs transition-all">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Montserrat:wght@300;400;500&display=swap");

        body {
          font-family: "Montserrat", system-ui, -apple-system, sans-serif;
        }

        h1,
        h2,
        h3,
        h4 {
          font-family: "Cormorant Garamond", serif;
        }

        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }

        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }
      `}</style>
    </div>
  );
};

export default MusicPage;
