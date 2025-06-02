import "dotenv/config";
import fetch from "node-fetch";


const fetchAllUsers =async () => {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?order=id.asc`;


  console.log("リクエストURL:",url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        "Authorrization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
    }
  });


  if (!response. ok) {
    throw new Error(`HTTPエラー！ステータス: ${response.status}`);
  }


  const date = await response.json();
  console.log("①取得したユーザー一覧", date);
};


await fetchAllUsers();




const fetchSelectedColums = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id,username&order=id.asc`, {
        method: "GET",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorrization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log("②選択したカラムのみ:", data);
};

await fetchSelectedColums();

const fetchUserByName = async (username) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?username=eq.${username}&select=id,username`, {
        method: "GET",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorrization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log(`③ユーザー名「${username}」のデータ:`, data);
};

await fetchUserByName("田中小次郎");

const fetchSortedUsers = async (order = "desc") => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/userTable?select=id,username,created_at&order=created_at.${order}`,{
        method: "GET",
        headers: {
            "apikey": process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            "Authorrization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log(`④作成日時降順 (${order}) のユーザー一覧`, data);
};

await fetchSortedUsers("desc");