def save_csv(df, path):
    import os
    os.makedirs(os.path.dirname(path), exist_ok=True)
    df.to_csv(path, index=False)
