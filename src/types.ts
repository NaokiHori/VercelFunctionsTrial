// グラフ描画に渡すデータ
// 各種データを[x, y]のリストで保持
export interface GraphValues {
  total: number[][];
  junior: number[][];
  middleAged: number[][];
  senior: number[][];
}

// 各都道府県情報を保持
export interface Prefecture {
  code: number;
  name: string;
  isSelected: boolean;
  graphValues: GraphValues | null;
}
