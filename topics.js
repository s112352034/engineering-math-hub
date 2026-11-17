const TOPICS = [
  {
    id: "exact-ode", category: "ODE", title: "一階正合微分方程", difficulty: "基礎",
    summary: "從正合條件求出位勢函數，快速建立隱式通解。",
    concept: "若 M(x,y)dx + N(x,y)dy = 0，且在單連通區域中 M、N 具有連續一階偏導數，當 Mᵧ=Nₓ 時，可找到 F 使 dF=Mdx+Ndy。",
    formula: "Mᵧ = Nₓ  →  Fₓ = M，Fᵧ = N  →  F(x,y) = C",
    steps: ["比較 M 對 y 的偏導與 N 對 x 的偏導。", "對 M 積分 x，保留未知函數 g(y)。", "再對 F 偏微分 y，和 N 比較求得 g(y)，寫成 F=C。"],
    example: {question:"求 (2xy+1)dx + (x²+2y)dy=0 的通解。", solution:"Mᵧ=2x，Nₓ=2x，故正合。F=x²y+x+g(y)；Fᵧ=x²+g′(y)=x²+2y，因此 g(y)=y²。通解為 x²y+x+y²=C。"},
    mistake:"對 x 積分後不能只寫常數 C，必須先保留 g(y)。",
    practice:{question:"求 (2x+y)dx+(x+2y)dy=0 的通解。",answer:"Mᵧ=Nₓ=1，F=x²+xy+y²，故 x²+xy+y²=C。"}
  },
  {
    id:"second-order-ode", category:"ODE", title:"二階常係數微分方程", difficulty:"基礎",
    summary:"利用特徵方程式判斷相異根、重根與複數根。",
    concept:"對齊次線性常係數方程 ay″+by′+cy=0（a≠0），假設 y=e^(rx)，代入後得到特徵方程式。根的型態決定通解。",
    formula:"ar²+br+c=0；重根 r 時：y=(C₁+C₂x)e^(rx)",
    steps:["寫出特徵方程式。","求根並判斷根的型態。","寫出兩個線性獨立解，再代入初值（若有）。"],
    example:{question:"求 y″−4y′+4y=0 的通解。",solution:"r²−4r+4=(r−2)²=0，為重根 r=2，故 y=(C₁+C₂x)e^(2x)。"},
    mistake:"重根不能寫成 C₁e^(rx)+C₂e^(rx)，因為兩項線性相依。",
    practice:{question:"求 y″+4y=0 的通解。",answer:"r=±2i，因此 y=C₁cos(2x)+C₂sin(2x)。"}
  },
  {
    id:"pde-separation", category:"PDE", title:"熱方程與分離變數法", difficulty:"進階",
    summary:"從齊次邊界條件找出特徵值及空間、時間解。",
    concept:"對熱方程 uₜ=α²uₓₓ（α>0），假設 u=X(x)T(t)。在兩端零溫度的齊次邊界條件下，非零模態對應正特徵值。",
    formula:"X″+λX=0；T′+α²λT=0；λₙ=(nπ/L)²，n=1,2,…",
    steps:["代入乘積解並以 XT 相除，令分離常數為 −λ。","利用 X(0)=X(L)=0 求得正弦特徵函數。","解時間方程，依初始條件決定各模態係數。"],
    example:{question:"uₜ=uₓₓ，0<x<π，兩端為零，u(x,0)=sin(2x)，求 u。",solution:"初始條件只含 n=2 模態，λ=4，時間因子 e^(−4t)，所以 u(x,t)=e^(−4t)sin(2x)。"},
    mistake:"邊界條件主要限制空間函數 X；初始條件則用於確定模態係數。",
    practice:{question:"同上，若 u(x,0)=3sin(x)，求 u。",answer:"u(x,t)=3e^(−t)sin(x)。"}
  },
  {
    id:"eigenvalues", category:"線性代數", title:"特徵值與特徵向量", difficulty:"基礎",
    summary:"由特徵多項式求出矩陣的特徵值及對應特徵空間。",
    concept:"給定方陣 A，若存在非零向量 v 使 Av=λv，則 λ 為特徵值、v 為特徵向量。",
    formula:"det(A−λI)=0；(A−λI)v=0，v≠0",
    steps:["計算 det(A−λI)。","解特徵方程求 λ。","逐一代入 (A−λI)v=0，找出非零解。"],
    example:{question:"A=[[2,1],[0,3]]，求特徵值與對應特徵向量。",solution:"det(A−λI)=(2−λ)(3−λ)，λ=2、3。λ=2 時可取 v=(1,0)ᵀ；λ=3 時可取 v=(1,1)ᵀ。"},
    mistake:"零向量雖滿足齊次方程，但不是特徵向量。",
    practice:{question:"A=[[4,0],[0,1]] 的特徵值與特徵向量為何？",answer:"λ=4 可取 (1,0)ᵀ；λ=1 可取 (0,1)ᵀ。"}
  },
  {
    id:"green-theorem", category:"向量微積分", title:"Green 定理", difficulty:"基礎",
    summary:"將平面封閉曲線的線積分轉換成區域二重積分。",
    concept:"若 C 為區域 D 的正向（外邊界逆時針）分段光滑封閉邊界，P、Q 在包含 D 的開區域具有連續一階偏導數，可使用 Green 定理。",
    formula:"∮C (P dx+Q dy) = ∬D (Qₓ−Pᵧ)dA",
    steps:["確認曲線封閉、方向及偏導數連續條件。","算出 Qₓ−Pᵧ。","依區域選擇直角或極座標積分。"],
    example:{question:"C 為單位圓逆時針，求 ∮C (−y dx+x dy)。",solution:"Qₓ−Pᵧ=1−(−1)=2，單位圓面積 π，因此積分為 2π。"},
    mistake:"順時針邊界要反號；使用極座標不可漏掉 Jacobian r。",
    practice:{question:"C 為半徑 2 的逆時針圓，求 ∮C (−y dx+x dy)。",answer:"被積函數為 2，圓面積為 4π，故答案 8π。"}
  },
  {
    id:"residue-theorem", category:"複變函數", title:"留數定理", difficulty:"進階",
    summary:"利用孤立奇點的留數計算封閉路徑複積分。",
    concept:"若 f 在正向簡單封閉曲線 C 上及其內部解析，除了曲線內有限個孤立奇點，且曲線上無奇點，可將複積分化為留數總和。",
    formula:"∮C f(z)dz = 2πi Σ Res(f,zₖ)；單極點：Res = lim(z→z₀)(z−z₀)f(z)",
    steps:["求出奇點與其位置。","只選取曲線內部的奇點並判定階數。","計算留數後乘 2πi 加總。"],
    example:{question:"沿 |z|=2 逆時針求 ∮ 1/(z−1) dz。",solution:"唯一奇點 z=1 在曲線內，留數為 1，故積分為 2πi。"},
    mistake:"曲線外部的奇點不能列入；若奇點位於路徑上，不能直接使用此定理。",
    practice:{question:"沿 |z|=1 逆時針求 ∮ 1/(z−2) dz。",answer:"z=2 位於圓外，圓內解析，所以積分為 0。"}
  },
  {
    id:"fourier-series", category:"傅立葉分析", title:"傅立葉級數", difficulty:"進階",
    summary:"將週期函數展開為正弦及餘弦級數，示範教材擴充規則。",
    concept:"對週期 2L 的分段光滑函數，可計算傅立葉係數；級數在連續點收斂至函數值，在跳躍點收斂至左右極限平均。",
    formula:"f(x) ~ a₀/2 + Σ[aₙcos(nπx/L)+bₙsin(nπx/L)]；aₙ=(1/L)∫₋Lᴸ f(x)cos(nπx/L)dx；bₙ 同式改用 sin。",
    steps:["由週期確認 L，判斷函數奇偶性。","計算 a₀、aₙ、bₙ（奇函數的 aₙ=0，偶函數的 bₙ=0）。","代回級數，並說明跳躍點收斂值。"],
    example:{question:"f(x)=x（−π<x<π）的 2π 週期延拓，求傅立葉級數。",solution:"f 為奇函數，a₀=aₙ=0。分部積分得 bₙ=(2/π)∫₀^π x sin(nx)dx=2(−1)^(n+1)/n。故 f(x)~Σ[2(−1)^(n+1)sin(nx)/n]。"},
    mistake:"不要漏掉 a₀/2；在跳躍點不能直接宣稱級數等於原函數任意指定的值。",
    practice:{question:"週期 2π 的 f(x)=cos(x)，哪些傅立葉係數非零？",answer:"只有 a₁=1，其餘係數皆為 0。"}
  }
];
if (typeof module !== "undefined") module.exports = TOPICS;
