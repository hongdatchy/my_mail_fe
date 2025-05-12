'use client';

import { useState, useEffect, act } from 'react';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import ActionDto from '@/dto/ActionDto';
import { SaveRoleDto } from '@/dto/SaveUserDto';

interface PermissionConfig {
  enabled: boolean;
  role: string;
  level: string;
}

interface Props {
  roleId: number;
  actions: ActionDto[];
  name: string;
  onChange: (updatedConfig: SaveRoleDto[]) => void;
  defaultValue?: SaveRoleDto[];
  disabled?: boolean;
}



const roles = ['Cá nhân', 'Tổ chức', 'Toàn hệ thống'];
const levels = ['a', 'b', 'c'];

export default function PermissionTable({ actions, onChange, roleId, name, defaultValue, disabled }: Props) {
  const defaultState: Record<string, PermissionConfig> = {};
  actions.forEach(({ code }) => {
    defaultState[code] = {
      enabled: false,
      role: code === 'create' ? 'Vô hiệu hóa' : 'Cá nhân', // `create` mặc định là "Vô hiệu hóa"
      level: 'a',
    };
  });

  const [permissions, setPermissions] = useState<Record<string, PermissionConfig>>(defaultState);

  useEffect(() => {
    const newState: Record<string, PermissionConfig> = {};

    actions.forEach(({ code, id }) => {
      const matched = defaultValue?.find((item) => item.actionId === id);
      if (matched) {
        newState[code] = {
          enabled: true,
          role: String(matched.configData.role ?? (code === 'create' ? 'Vô hiệu hóa' : 'Cá nhân')),
          level: String(matched.configData.level ?? 'a'),
        };
      }
      else {
        newState[code] = {
          enabled: false,
          role: code === 'create' ? 'Vô hiệu hóa' : 'Cá nhân',
          level: 'a',
        };
      }
    });

    setPermissions(newState);
  }, [actions, defaultValue]);


  const emitEnabledPermissions = (data: Record<string, PermissionConfig>) => {
    const updatedConfig = actions
      .filter(({ code }) => data[code]?.enabled)
      .map(({ id, code }) => ({
        roleId: roleId,
        roleName: "",
        actionId: id,
        configData: {
          role: data[code].role,
          level: data[code].level,
        },
      }));

    onChange(updatedConfig);
  };


  const updatePermissions = (newPermissions: Record<string, PermissionConfig>) => {
    setPermissions(newPermissions);
    emitEnabledPermissions(newPermissions);
  };

  const allChecked = actions.every((a) => permissions[a.code]?.enabled);

  const toggleAll = (value: boolean) => {
    const updated = { ...permissions };
    actions.forEach(({ code }) => {
      updated[code] = {
        ...updated[code],
        enabled: value,
      };

      // Nếu là 'create' thì cập nhật role tương ứng
      if (code === 'create') {
        updated[code].role = value ? 'Cho phép' : 'Vô hiệu hóa';
      }
    });

    updatePermissions(updated);
  };

  const handleCheckboxChange = (checked: boolean, code: string) => {
    const updatedPermissions = {
      ...permissions,
      [code]: { ...permissions[code], enabled: checked },
    };

    // Nếu là `create`, đồng bộ role với trạng thái checkbox
    if (code === 'create') {
      updatedPermissions[code] = {
        enabled: checked,
        role: checked ? 'Cho phép' : 'Vô hiệu hóa', // Cập nhật vai trò khi bật/tắt
        level: updatedPermissions[code].level, // Giữ nguyên mức độ
      };
    }

    updatePermissions(updatedPermissions);
  };

  const updateField = (code: string, field: 'role' | 'level', value: string) => {
    const updatedPermissions = {
      ...permissions,
      [code]: {
        ...permissions[code],
        [field]: value,
      },
    };

    // Nếu là `create`, đồng bộ trạng thái enabled với role
    if (code === 'create' && field === 'role') {
      updatedPermissions[code].enabled = value === 'Cho phép';
    }

    updatePermissions(updatedPermissions);
  };

  return (
    <div className="border rounded-xl p-4 space-y-3">
      <div className="flex justify-between items-center">
        <Label className="font-medium">{name}</Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            disabled = {disabled}
            checked={allChecked}
            onCheckedChange={(checked) => toggleAll(checked !== false)}
          />
          <span className="text-sm">Chọn tất cả</span>
        </div>
      </div>

      {actions.map(({ id, name, code }) => {
        const perm = permissions[code];
        if (!perm) return null;

        return (
          <div key={id} className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <div className="flex items-center gap-3 min-w-[100px] sm:w-auto w-full">
              <Checkbox
                disabled = {disabled}
                checked={perm.enabled}
                onCheckedChange={(checked: boolean) => handleCheckboxChange(checked, code)}
                className="shrink-0"
              />

              <span className="text-sm font-medium">{name}</span>
            </div>
            <div className="sm:flex-1 w-full">
              <Select
                disabled = {disabled}
                value={perm.role}
                onValueChange={(val) => updateField(code, 'role', val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Vai trò" />
                </SelectTrigger>
                <SelectContent>
                  {(code === 'create' ? ['Vô hiệu hóa', 'Cho phép'] : roles).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:flex-1 w-full">
              <Select
                disabled = {disabled}
                value={perm.level}
                onValueChange={(val) => updateField(code, 'level', val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Mức độ" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

        );
      })}
    </div>
  );
}
